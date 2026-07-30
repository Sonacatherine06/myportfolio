/* ============================================================
   portfolio-data.js — EDIT THIS FILE, not the HTML
   ============================================================
   Central place for everything you're likely to update often:
   contact info, social links, resume, certificates and projects.
   Loaded as a plain classic <script> (same pattern as data.js)
   so the site keeps working from a plain double-click, no build
   step required.

   After changing anything here, just save and refresh the page —
   script.js reads this file and re-renders the certificate grid
   and (on projects.html) the project cards automatically.

   See README.md for a full "how do I..." guide for each section.
   ============================================================ */

const PORTFOLIO = {

  // ---------------------------------------------------------
  // PROFILE / CONTACT — used in the hero, footer and contact
  // section on every page.
  // ---------------------------------------------------------
  profile: {
    name: 'Sona Catherine',
    role: 'Electronics & Communication Engineering Student',
    email: 'sonacatherine06@gmail.com',
    phone: '+91 62826 54154',
    phoneHref: '+916282654154',
    location: 'Kerala, India',
    githubUsername: 'Sonacatherine06',
    github: 'https://github.com/Sonacatherine06',
    githubRepos: 'https://github.com/Sonacatherine06?tab=repositories',
    linkedin: 'https://www.linkedin.com/in/sona-catherine/',
    resume: 'resume/Sona_Catherine_Resume.pdf',
  },

  // ---------------------------------------------------------
  // CERTIFICATES — powers the grid in the "Certifications &
  // Achievements" section of index.html (#certGrid).
  //
  // To add a new certificate:
  //   1. Drop the certificate file into certificates/
  //   2. Drop a small preview image into certificates/thumbs/
  //      (optional — if you skip this, or the file is missing,
  //      the card automatically falls back to a text tile, no
  //      broken image ever shows).
  //   3. Add one object below.
  //
  // category must be one of: "internship", "workshop", "course"
  // (these power the filter buttons above the grid).
  // ---------------------------------------------------------
  certificates: [
    {
      title: 'MATLAB Onramp Certification',
      subtitle: 'MATLAB Academy, 2025',
      category: 'course',
      file: 'certificates/MATLAB-Onramp-Certificate.pdf',
      thumb: 'certificates/thumbs/matlab-thumb.jpg',
    },
    {
      title: 'Design Thinking – A Primer',
      subtitle: 'NPTEL Certification, 2025',
      category: 'course',
      file: 'certificates/NPTEL-Design-Thinking-Certificate.pdf',
      thumb: 'certificates/thumbs/nptel-thumb.jpg',
    },
    {
      title: 'Solar Photovoltaic Workshop',
      subtitle: 'Christ College of Engineering / ECTA, 2023',
      category: 'workshop',
      file: 'certificates/Solar-Photovoltaic-Workshop-Certificate.jpeg',
      thumb: 'certificates/thumbs/solar-thumb.jpg',
    },
    {
      title: 'H2OForge Underwater Robotics Workshop',
      subtitle: 'IEEE Computer Society Kerala Chapter, 2023',
      category: 'workshop',
      file: 'certificates/H2OForge-IEEE-Certificate.jpeg',
      thumb: 'certificates/thumbs/h2oforge-thumb.jpg',
    },
    {
      title: 'BSNL RTTC Internship Certificate',
      subtitle: 'BSNL Regional Telecom Training Centre, 2026',
      category: 'internship',
      file: 'certificates/BSNL-Internship-Certificate.pdf',
      thumb: 'certificates/thumbs/bsnl-thumb.jpg',
    },
    {
      title: 'Evolve Robotics Internship Certificate',
      subtitle: 'Evolve Robotics, 2025',
      category: 'internship',
      file: 'certificates/Evolve-Robotics-Internship-Certificate.pdf',
      thumb: 'certificates/thumbs/evolve-thumb.jpg',
    },
  ],

  // ---------------------------------------------------------
  // PROJECT CATEGORIES — powers the three sections on
  // projects.html. Don't reorder/rename the `key` values
  // ('sensor' | 'actuator' | 'combo') without also updating
  // the `category` field on every project below to match.
  // ---------------------------------------------------------
  projectCategories: [
    {
      key: 'sensor',
      icon: '📡',
      title: 'Sensor Projects',
      description: 'Projects focused on detecting physical conditions, movement, distance, vibration, or tilt.',
    },
    {
      key: 'actuator',
      icon: '⚙️',
      title: 'Actuator & Output Projects',
      description: 'Projects focused on producing an action, movement, light, sound, or display.',
    },
    {
      key: 'combo',
      icon: '🔄',
      title: 'Sensor + Actuator Projects',
      description: 'Projects where a sensor takes input and an actuator or output device responds automatically.',
    },
    {
      key: 'software',
      icon: '💻',
      title: 'Software Projects',
      description: 'Standalone software and programming projects written in Go, Python, and other languages.',
    },
  ],

  // ---------------------------------------------------------
  // FEATURED PROJECTS — the ONLY GitHub projects that will ever
  // show up on the portfolio. Nothing from your GitHub account
  // appears here automatically — a project has to be added to
  // this list by hand.
  //
  // Your projects currently live as folders inside ONE shared
  // repo (github.com/Sonacatherine06/Arduino_Projects), so every
  // entry below points `githubRepo` at that repo and uses
  // `repoPath` for the specific folder. If you ever split a
  // project into its own separate repo instead, just remove
  // `repoPath` from that entry and set `githubRepo` to the new
  // repo's name — the link updates automatically either way.
  //
  // To add a project:
  //   1. Push/finish the code as a folder in Arduino_Projects
  //      (or its own repo).
  //   2. Add one object below.
  //   3. Save — the card appears, numbered automatically as the
  //      next number in its category (see README.md for details).
  //
  // Field reference:
  //   githubRepo   — repo name, e.g. 'Arduino_Projects'
  //   repoPath     — folder name INSIDE that repo, e.g. 'Ultrasonic Sensor'
  //                  (omit this field entirely if the project is its own
  //                  standalone repo, not a folder inside a shared one)
  //   repoBranch   — only needed if the repo's default branch isn't
  //                  'main' (e.g. set to 'master' if that's what you use)
  //   title        — display title on the card
  //   category     — 'sensor' | 'actuator' | 'combo'
  //   description  — one or two sentences for the card
  //   image        — card thumbnail (optional — falls back to an icon tile)
  //   circuitImage — shown in the "View Project" detail popup (optional)
  //   outputImage  — shown in the "View Project" detail popup (optional)
  //   detailPage   — link to a full custom project page, if you build one
  //                  later (optional — if set, "View Project" goes there
  //                  instead of opening the built-in detail popup)
  //
  // ⚠️ CURRENT STATUS (checked directly against your live GitHub repo):
  // Arduino_Projects is currently FLAT — the category folders you tried to
  // create got deleted, so `repoPath` below points at the flat, original
  // folder names for now, matching what's actually on GitHub today. Links
  // will work right now. If/when you successfully reorganize the repo into
  // 01-Sensor-Projects/… etc. (see README.md → "Reorganizing Arduino_Projects
  // on GitHub" — go slowly, one project at a time, and don't delete the
  // category folders afterward), update `repoPath` here to match, or ask
  // and I'll do it. The site's built-in existence check will flag any path
  // that doesn't match with a small warning on that project's card.
  // ---------------------------------------------------------
  featuredProjects: [
    // --- 📡 Sensor Projects ---
    {
      githubRepo: 'Arduino_Projects',
      repoPath: '07-Ultrasonic-Sensor',
      title: 'Ultrasonic Sensor',
      category: 'sensor',
      description: 'Measures the distance to an object using an HC-SR04 ultrasonic sensor on an Arduino Uno — sends a 10-microsecond trigger pulse, times the echo with pulseIn(), and prints the live distance in centimetres to the Serial Monitor every 500ms.',
      image: 'images/projects/ultrasonic-circuit.png',
      circuitImage: 'images/projects/ultrasonic-circuit.png',
      outputImage: 'images/projects/ultrasonic-output.png',
    },
    {
      githubRepo: 'Arduino_Projects',
      // NOTE: this folder currently doesn't exist on GitHub at all — its
      // README.md was the only file it ever had, and that got deleted too.
      // This link points at the repo root until the folder exists again.
      repoPath: '',
      title: 'Vibration Sensor',
      category: 'sensor',
      description: 'Detects mechanical vibration or tapping using an SW-420 vibration sensor and flags it with a digital output.',
      image: 'images/vibration.png',
      circuitImage: '',
      outputImage: '',
    },
    {
      githubRepo: 'Arduino_Projects',
      repoPath: '09_Tilt_Sensor',
      title: 'Tilt Sensor',
      category: 'sensor',
      description: 'Reads a tilt switch on Digital Pin 2 (using the Arduino\'s internal pull-up) and prints "Tilt Detected" or "Normal Position" to the Serial Monitor depending on the sensor\'s orientation.',
      image: 'images/projects/tilt-circuit.png',
      circuitImage: 'images/projects/tilt-circuit.png',
      outputImage: 'images/projects/tilt-output.png',
    },

    // --- ⚙️ Actuator & Output Projects ---
    {
      githubRepo: 'Arduino_Projects',
      repoPath: '01-LED-Blink',
      title: 'LED Blink',
      category: 'actuator',
      description: 'The classic first embedded program — blinks an LED at a fixed interval to verify a board and toolchain are working.',
      image: 'images/led-blink.png',
      circuitImage: '',
      outputImage: '',
    },
    {
      githubRepo: 'Arduino_Projects',
      repoPath: '02-Buzzer',
      title: 'Buzzer',
      category: 'actuator',
      description: 'Drives an active/passive buzzer to produce alert tones and short beep patterns on command.',
      image: 'images/buzzer.png',
      circuitImage: '',
      outputImage: '',
    },
    {
      githubRepo: 'Arduino_Projects',
      repoPath: '03-Hobby-motor',
      title: 'Hobby Motor',
      category: 'actuator',
      description: 'Controls a small DC hobby motor\'s speed and direction using PWM and a transistor/motor driver.',
      image: 'images/hobby-motor.png',
      circuitImage: '',
      outputImage: '',
    },
    {
      githubRepo: 'Arduino_Projects',
      repoPath: '04-RGB-LED',
      title: 'RGB LED',
      category: 'actuator',
      description: 'Mixes red, green and blue channels with PWM to produce custom colours from a single RGB LED.',
      image: 'images/rgb-led.png',
      circuitImage: '',
      outputImage: '',
    },
    {
      githubRepo: 'Arduino_Projects',
      repoPath: '05-NeoPixel',
      title: 'NeoPixel',
      category: 'actuator',
      description: 'Drives an addressable WS2812 NeoPixel strip with per-pixel colour and animation patterns.',
      image: 'images/neopixel.png',
      circuitImage: '',
      outputImage: '',
    },
    {
      githubRepo: 'Arduino_Projects',
      repoPath: '06-LCD',
      title: 'LCD',
      category: 'actuator',
      description: 'Displays live sensor readings and status text on a 16x2 character LCD over I2C.',
      image: 'images/lcd.png',
      circuitImage: '',
      outputImage: '',
    },

    // --- 🔄 Sensor + Actuator Projects ---
    // (empty for now — projects.html shows a "Coming Soon" card
    // for this category until the first entry is added here)

    // --- 💻 Software Projects ---
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'even-odd',
      title: 'Even or Odd',
      category: 'software',
      description: 'A Go program that determines whether a given number is even or odd, with a multi-stage Dockerfile for containerized execution.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'leap-year',
      title: 'Leap Year Checker',
      category: 'software',
      description: 'A Go program that checks if a year is a leap year using the standard Gregorian calendar rules, packaged with Docker.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'armstrong-number',
      title: 'Armstrong Number Checker',
      category: 'software',
      description: 'A Go program that checks whether a number is an Armstrong (narcissistic) number, with a multi-stage Docker build.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'gcd',
      title: 'Greatest Common Divisor',
      category: 'software',
      description: 'A Go program that calculates the GCD of two numbers using the Euclidean algorithm, with a Dockerfile.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'lcm',
      title: 'Least Common Multiple',
      category: 'software',
      description: 'A Go program that calculates the LCM of two numbers using the GCD formula, packaged with Docker.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'temperature-converter',
      title: 'Temperature Converter',
      category: 'software',
      description: 'A Go program that converts Celsius to Fahrenheit and Kelvin, with a multi-stage Docker build.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'currency-converter',
      title: 'Currency Converter',
      category: 'software',
      description: 'A Go program that converts between USD, EUR, GBP, JPY, INR, CAD, and AUD using fixed exchange rates, with Docker support.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'multiplication-table',
      title: 'Multiplication Table',
      category: 'software',
      description: 'A Go program that prints the multiplication table for a given number from 1 to 10, packaged with a Dockerfile.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'largest-of-three',
      title: 'Largest of Three Numbers',
      category: 'software',
      description: 'A Go program that finds the largest number among three given numbers, with a multi-stage Docker build.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'vowel-counter',
      title: 'Vowel Counter',
      category: 'software',
      description: 'A Go program that counts the number of vowels in a given string, packaged with a Dockerfile.',
    },
  ],
};

// Convenience alias matching the config shape requested for the GitHub
// integration — same data as PORTFOLIO.featuredProjects, just exposed
// under its own name too.
const featuredProjects = PORTFOLIO.featuredProjects;
