---
title: "Covid 19 Google Trends Dashboard"
description: "Providing insights into the impact of Covid-19 on the world using Google Trends data, as part of the Data Fest 2020 competition. Winner of the Judge's Pick award."
date: 2020-06-04T05:00:00Z
image:  "/images/posts/Dashboard.png"
categories: 
  - "Data Science"
tags: 
  - "Data Science"
  - "Data Visualisation"
  - "Covid-19"
  - "Data Fest"
draft: false
---

## Data Fest 2020 🏆 Judge’s pick

- How many confirmed cases till countries decided go into lockdown?
- How closely are people adhering to lockdown guidelines?
- Are people concerned about taking preventative measures against a global pandemic?

Using Google mobility trends as well as search trends for keywords like:
- Face mask
- Sanitiser
- Social distancing

We looked into these issues, focusing especially on members' home countries including India and Malaysia.

Comparing these results against countries like the US and UK, the team investigates whether there is a difference in the degree of interest and awareness towards Covid-19 between East and West.

### Presentation Video and Competition Link

<a href="https://datafest-edi.github.io/web/df2020/"> Datafest-edi</a>

<iframe width="100%" height="300" src="https://www.youtube.com/embed/30CHqnLB_5E" title="YouTube video player" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>

### Tableau Dashboard

***Note: The dashboard is interactive and can be used to explore the data, however, it is not responsive and is best viewed on a desktop.***

<script src="https://www.example.com/javascripts/api/tableau-2.js"></script>

<!-- Empty div where the viz will be placed -->
<div id="tableauViz"></div>

<div class="row fullwidth">
  <div
    class="tableauPlaceholder"
    id="viz1633159632425"
    style="position: relative"
  >
    <noscript
      ><a href="#"
        ><img
          alt="Dashboard 1 "
          src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Se&#47;SearchingusinCovid19&#47;Dashboard1&#47;1_rss.png"
          style="border: none" /></a></noscript
    ><object class="tableauViz" style="display: none">
      <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
      <param name="embed_code_version" value="3" />
      <param name="site_root" value="" />
      <param name="name" value="SearchingusinCovid19&#47;Dashboard1" />
      <param name="tabs" value="no" />
      <param name="toolbar" value="no" />
      <param
        name="static_image"
        value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Se&#47;SearchingusinCovid19&#47;Dashboard1&#47;1.png"
      />
      <param name="animate_transition" value="no" />
      <param name="display_static_image" value="no" />
      <param name="display_spinner" value="no" />
      <param name="display_overlay" value="no" />
      <param name="display_count" value="no" />
      <param name="language" value="en-US" />
    </object>
  </div>
  <script type="text/javascript">
    var divElement = document.getElementById("viz1633159632425");
    var vizElement = divElement.getElementsByTagName("object")[0];
    vizElement.style.width = "100%";
    vizElement.style.height = "720px";
    var scriptElement = document.createElement("script");
    scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  </script>
</div>

<script>
    function initializeViz() {
        // JS object that points at empty div in the html
        var placeholderDiv = document.getElementById("tableauViz");
        // URL of the viz to be embedded
        var url = "http://public.tableau.com/views/WorldIndicators/GDPpercapita";
        // An object that contains options specifying how to embed the viz
        var options = {
            width: '1280px',
            height: '720px',
            hideTabs: true,
            hideToolbar: true,
        };
        viz = new tableau.Viz(placeholderDiv, url, options);
    }
</script>