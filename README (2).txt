Optional folder for extra photos:

- A non-embedded profile photo, event photos for the PM-VIKAS marquee, etc.
  (the hero photo currently ships embedded directly in index.html).

- Featured project thumbnails referenced from portfolio-data.js
  (featuredProjects[].image), e.g. ultrasonic.png, led-blink.png. If a
  thumbnail is missing, the project card automatically falls back to a
  category icon tile — nothing breaks — so it's fine to add these later.

- Circuit diagrams / output photos referenced from featuredProjects[].circuitImage
  and .outputImage, shown in the "View Project" popup for each project.
