---
layout: page
permalink: /activities/
title: Activities &amp; Service
eyebrow: Conferences, talks, and service
lede: Conference presentations, invited talks, reviewing, and program committee work. The complete version of this list is in the CV.
description: Conferences, talks and academic service for Yimeng Liu, Ph.D. candidate at Michigan State University.
---

<div class="record__cols record__cols--top">
  <div class="record__block">
    <h2 class="page__h2">Conferences &amp; events</h2>
    <ul class="timeline-list">
      {% for item in site.data.record.conferences %}
      <li>
        <span class="timeline-list__period">{{ item.year }}</span>
        <span class="timeline-list__body"><strong>{{ item.role }}</strong>{{ item.title }}{% if item.place %}, {{ item.place }}{% endif %}</span>
      </li>
      {% endfor %}
    </ul>

    <h2 class="page__h2">Invited talk</h2>
    <p class="record__text">{{ site.data.record.talk }}</p>
  </div>

  <div class="record__block">
    <h2 class="page__h2">Service</h2>
    <p class="record__label">Invited reviewer</p>
    <ul class="plain-list">
      {% for item in site.data.record.service.invited_reviewer %}<li>{{ item }}</li>{% endfor %}
    </ul>
    <p class="record__label">Invited program committee</p>
    <ul class="plain-list">
      {% for item in site.data.record.service.program_committee %}<li>{{ item }}</li>{% endfor %}
    </ul>

    <h2 class="page__h2">Contact</h2>
    <ul class="plain-list">
      <li>Email — <a href="{{ site.email_link }}">{{ site.email }}</a></li>
      <li><a href="{{ site.address_link }}" target="_blank" rel="noopener">{{ site.address }}</a></li>
      <li><a href="{{ site.google_scholar }}" target="_blank" rel="noopener">Google Scholar</a></li>
      <li><a href="{{ site.linkedin }}" target="_blank" rel="noopener">LinkedIn</a></li>
      <li><a href="{{ site.github }}" target="_blank" rel="noopener">GitHub</a></li>
    </ul>
  </div>
</div>

<div class="record__contact">
  {% if site.cv_link %}<a class="btn btn--solid" href="{{ site.cv_link }}" target="_blank" rel="noopener">Curriculum vitae</a>{% endif %}
  <a class="btn btn--line" href="{{ '/' | relative_url }}#work">Selected work</a>
  <a class="btn btn--line" href="{{ '/news/' | relative_url }}">Timeline</a>
</div>