---
layout: page
permalink: /news/
title: News & Timeline
eyebrow: Full timeline
lede: Career updates, papers, and talks, in reverse chronological order.
description: Full news timeline for Yimeng Liu, Ph.D. candidate at Michigan State University.
---

<ul class="news timeline">
  {% for item in site.data.news.main %}
  <li class="timeline__item reveal">
    <time class="timeline__date" datetime="{{ item.iso_date | default: item.date }}">{{ item.date }}</time>
    <div class="timeline__content">
      {% if item.badge %}<span class="badge">{{ item.badge }}</span>{% endif %}
      {{ item.html }}
    </div>
  </li>
  {% endfor %}
</ul>