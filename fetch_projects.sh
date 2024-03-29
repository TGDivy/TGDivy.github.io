#!/bin/bash

username="TGDivy"
projects_dir="src/content/projects"
projects_images_dir="public/images/projects"
projects_images_save_path="images/projects"

mkdir -p $projects_dir
mkdir -p $projects_images_dir

# List all repositories of the user
repos=$(gh repo list $username --json nameWithOwner -q '.[].nameWithOwner' -L 1000)

count=0
skip_count=0
readme_skip_count=0

# Loop through each repository
for repo in $repos
do

  # if reponame is not TGDivy/Language-Evolution
  # if [[ $repo != TGDivy/Language-Evolution ]]; then
  #   continue
  # fi

  # everything before the slash is the username
  reponame=$(echo $repo | cut -d'/' -f2)

  # Get the Repository Details
  repo_details=$(gh api -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" repos/$repo)

  # Extract name, description, topics, html_url, forks_count, stargazers_count, size, watchers_count from the response
  name=$(echo $repo_details | jq -r '.name')
  description=$(echo $repo_details | jq -r '.description')
  created_at=$(echo $repo_details | jq -r '.created_at')
  updated_at=$(echo $repo_details | jq -r '.updated_at')
  date=$(echo $repo_details | jq -r '.updated_at')

  languages_url=$(echo $repo_details | jq -r '.languages_url')
  topics=$(echo $repo_details | jq -r '.topics')
  html_url=$(echo $repo_details | jq -r '.html_url')
  forks_count=$(echo $repo_details | jq -r '.forks_count')
  stargazers_count=$(echo $repo_details | jq -r '.stargazers_count')
  size=$(echo $repo_details | jq -r '.size')
  watchers_count=$(echo $repo_details | jq -r '.watchers_count')

  if [ -z "$name" ] || [ -z "$description" ] || [ "$topics" = "[]" ] || [ "$name" = "null" ] || [ "$description" = "null" ] || [ "$topics" = "null" ]
  then
    # If any of them are, skip the current iteration of the loop
    echo -e "\033[0;31mSkipping $reponame as it does not have a name, description or topics\033[0m"
    skip_count=$((skip_count+1))
    continue
  fi

  # Download the README file details
  response=$(gh api -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" repos/$repo/readme)

  # Extract the download URL from the response
  download_url=$(echo $response | jq -r '.download_url')

  content=$(curl -s $download_url)

  # Check if the content is empty
  if [ -z "$content" ]
  then
    # If the content is empty, skip the current iteration of the loop
    echo -e "\033[0;31mSkipping $reponame as it does not have a README file\033[0m"
    readme_skip_count=$((readme_skip_count+1))
    continue
  fi

  # Create a directory to store images
  mkdir -p $projects_images_dir/$reponame

  # Extract all image URLs from the README content
  image_urls=$(echo "$content" | grep -oP '!\[.*?\]\(\K[^)]*')
  # Filter out duplicate URLs
  image_urls=$(echo "$image_urls" | uniq)

  echo -e "The image URLs are: $image_urls"
  
  project_image_url=""
  # Download each image
  while read -r url; do
    if [[ -z "$url" ]]; then
      continue
    fi
    # Check if the URL is a relative path
    if [[ $url != http* ]]; then
      # If it is, download the file from the repository
      temp=$(gh api -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" "repos/$repo/contents/$url")
      # delete content
      temp=$(echo $temp | jq 'del(.content)')
      download_url=$(echo $temp | jq -r '.download_url')
      # if not url, then skip
      if [[ $download_url == null ]]; then
        continue
      fi
      filename=$(echo $temp | jq -r '.name')
      echo -e "\033[0;32mDownloading $filename\033[0m"
      echo $download_url

      curl -s "$download_url" -o "$projects_images_dir/$reponame/$filename"
      # Replace the relative path with the absolute path    
      content=$(echo "$content" | sed "s|$url|/$projects_images_save_path/$reponame/$filename|g")

      # if project_image_url is empty, then set it to the first image url
      if [[ -z "$project_image_url" ]]; then
        project_image_url="/$projects_images_save_path/$reponame/$filename"
      fi
    fi
  done <<< $image_urls

  # Convert the topics array to a string with each topic separated by a newline and prefixed with a hyphen and tab from the start for each topic on each line
  topics_yaml=$(echo $topics | jq -r '.[]' | sed -e 's/^/- /')

  # Create a YAML string with the extracted details
  yaml_string="---
title: \"$name\"
description: \"$description\"
image: \"$project_image_url\"
tags: 
$topics_yaml
created_at: $created_at
updated_at: $updated_at
date: $date
html_url: \"$html_url\"
forks_count: $forks_count
stargazers_count: $stargazers_count
size: $size
watchers_count: $watchers_count
---\n"

  # Prepend the YAML string to the markdown file
  echo -e "$yaml_string\n$content" > $projects_dir/$reponame.md

  echo -e "\033[0;32mSuccessfully downloaded $reponame\033[0m"
  count=$((count+1))
done

echo -e "\033[0;34mTotal repositories processed: $((count+skip_count+readme_skip_count))\033[0m"
echo -e "\033[0;32mTotal repositories successfully downloaded: $count\033[0m"
echo -e "\033[0;31mTotal repositories skipped due to missing name, description, or topics: $skip_count\033[0m"
echo -e "\033[0;31mTotal repositories skipped due to missing README: $readme_skip_count\033[0m"
