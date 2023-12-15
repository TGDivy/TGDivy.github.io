#!/bin/bash

# Replace 'username' with the GitHub username
username="TGDivy"

# List all repositories of the user
repos=$(gh repo list $username --json nameWithOwner -q '.[].nameWithOwner')

count=0
# Loop through each repository
for repo in $repos
do

  # everything before the slash is the username
  reponame=$(echo $repo | cut -d'/' -f2)

  # Download the README file details
  response=$(gh api -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" repos/$repo/readme)

  # Extract the download URL from the response
  download_url=$(echo $response | jq -r '.download_url')
  echo $download_url

  # Get the Repository Details
  repo_details=$(gh api -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" repos/$repo)

  # Extract name, description, topics, html_url, forks_count, stargazers_count, size, watchers_count from the response
  name=$(echo $repo_details | jq -r '.name')
  description=$(echo $repo_details | jq -r '.description')
  topics=$(echo $repo_details | jq -r '.topics')
  html_url=$(echo $repo_details | jq -r '.html_url')
  forks_count=$(echo $repo_details | jq -r '.forks_count')
  stargazers_count=$(echo $repo_details | jq -r '.stargazers_count')
  size=$(echo $repo_details | jq -r '.size')
  watchers_count=$(echo $repo_details | jq -r '.watchers_count')

  if [ -z "$name" ] || [ -z "$description" ] || [ "$topics" = "[]" ] || [ "$name" = "null" ] || [ "$description" = "null" ] || [ "$topics" = "null" ]
  then
    # If any of them are, skip the current iteration of the loop
    echo "Skipping $reponame as it does not have a name, description or topics"
    continue
  fi

  content=$(curl -s $download_url)

  # Check if the content is empty
  if [ -z "$content" ]
  then
    # If the content is empty, skip the current iteration of the loop
    echo "Skipping $reponame as it does not have a README file"
    continue
  fi


  # Convert the topics array to a string with each topic separated by a newline and prefixed with a hyphen and tab from the start for each topic on each line
  topics_yaml=$(echo $topics | jq -r '.[]' | sed -e 's/^/- /')
  
  # Create a YAML string with the extracted details
  yaml_string="---
name: \"$name\"
description: \"$description\"
topics: 
$topics_yaml
html_url: \"$html_url\"
forks_count: $forks_count
stargazers_count: $stargazers_count
size: $size
watchers_count: $watchers_count
---\n"

  # Prepend the YAML string to the markdown file
  echo -e "$yaml_string\n$content" > readme_files/$reponame.md
  
  # break the loop after 5 repositories
  if [ $count -eq 2 ]
  then
    break
  fi
  # increment the count
  count=$((count+1))
done
