---
layout: page
permalink: /activities/
title: Activities & Service
eyebrow: Conferences, talks, and service
lede: Conference presentations, invited talks, reviewing, and program committee work. Full details are also in my CV.
description: Conferences, talks and academic service for Yimeng Liu, Ph.D. candidate at Michigan State University.
---

<h2 class="page__h2">Conferences &amp; Events</h2>
<ul class="activity-list">
  {% for conf in site.data.conferences.main %}
  <li class="activity reveal">
    <a class="activity__link" href="{{ conf.web }}" target="_blank" rel="noopener">{{ conf.title }}</a>
    {% if conf.role %}<span class="activity__role">{{ conf.role }}</span>{% endif %}
  </li>
  {% endfor %}
</ul>

<h2 class="page__h2">Invited Talk</h2>
<ul class="prose">
  <li>University of Hawai&#699;i at M&#257;noa, Oct. 2024</li>
</ul>

<h2 class="page__h2">Reviewing</h2>
<h3 class="page__h3">Invited Reviewer</h3>
<ul class="prose">
  <li>UbiComp / ISWC · UbiSense 2025</li>
  <li>IEEE Internet of Things Journal</li>
  <li>IEEE Transactions on Mobile Computing</li>
  <li>IEEE Internet Computing</li>
  <li>HAI 2025 · Poster track</li>
</ul>

<h3 class="page__h3">Invited Program Committee</h3>
<ul class="prose">
  <li>IEEE DSAA 2025</li>
</ul>

<h2 class="page__h2">Contact</h2>
<ul class="prose">
  <li>Email: {{ site.email }}</li>
  <li>Address: <a href="{{ site.address_link }}" target="_blank" rel="noopener">{{ site.address }}</a></li>
  <li><a href="{{ site.google_scholar }}" target="_blank" rel="noopener">Google Scholar</a></li>
  <li><a href="{{ site.linkedin }}" target="_blank" rel="noopener">LinkedIn</a></li>
</ul>