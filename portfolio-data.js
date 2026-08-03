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
      key: 'esp32',
      icon: '📡',
      title: 'ESP32 Projects',
      description: 'ESP-IDF projects on the ESP32 microcontroller — GPIO, PWM, ADC, I2C, FreeRTOS and cloud telemetry.',
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
  // Projects are sourced from these GitHub repos:
  //   • Sonacatherine06/Sensor_Projects         → sensor
  //   • Sonacatherine06/Actuator-Projects       → actuator
  //   • Sonacatherine06/ESP32-Wokwi-Projects     → esp32
  //   • Sonacatherine06/one-sensor-one-actuator  → combo
  //   • Sonacatherine06/go-docker-practice       → software
  //
  // Field reference:
  //   githubRepo   — repo name
  //   repoPath     — folder name INSIDE that repo (omit if standalone)
  //   repoBranch   — only if default branch isn't 'main'
  //   title, category, description, image, circuitImage, outputImage
  //
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
    // --- 📡 Sensor Projects (from Sensor_Projects repo) ---
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '01-flex-sensor',
      title: 'Flex Sensor',
      category: 'sensor',
      icon: '🦴',
      description: 'Reads the bend of a flex sensor on analog pin A0 and prints the live resistance-based ADC value to the Serial Monitor as it flexes.',
      circuitImage: 'pv-sensor-01-flex-circuit.png',
      outputImage: '',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '02-forcesensor',
      title: 'Force Sensitive Resistor (FSR)',
      category: 'sensor',
      icon: '👆',
      description: 'Reads a force-sensitive resistor on A0 and prints the applied-pressure value to the Serial Monitor as force increases or decreases.',
      circuitImage: 'pv-sensor-02-force-circuit.png',
      outputImage: '',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '04-Microphone-sensor',
      title: 'Microphone Sensor',
      category: 'sensor',
      icon: '🎤',
      description: 'Reads sound intensity on analog pin A0 and streams the live analog value to the Serial Monitor as sound levels change.',
      image: 'pv-sensor-04-mic-circuit.png',
      circuitImage: 'pv-sensor-04-mic-circuit.png',
      outputImage: '',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '05-Potentiometer',
      title: 'Potentiometer',
      category: 'sensor',
      icon: '🎚️',
      description: 'Reads the wiper position of a potentiometer on A0 and prints the analog value (0–1023) to the Serial Monitor as it is turned.',
      image: 'pv-sensor-05-pot-circuit.png',
      circuitImage: 'pv-sensor-05-pot-circuit.png',
      outputImage: '',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '06-Temperature-sensor',
      title: 'Temperature Sensor (TMP36)',
      category: 'sensor',
      icon: '🌡️',
      description: 'Converts a TMP36 analog sensor voltage into degrees Celsius and prints the live temperature to the Serial Monitor.',
      image: 'pv-sensor-06-temp.png',
      circuitImage: 'pv-sensor-06-temp.png',
      outputImage: '',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '07-PIR-sensor',
      title: 'PIR Motion Sensor',
      category: 'sensor',
      icon: '🕵️',
      description: 'Detects human movement with a PIR sensor on Digital Pin 2, drives an output on Pin 9 and logs "Motion Detected" / "No Motion" to the Serial Monitor.',
      image: 'pv-sensor-07-pir-circuit.png',
      circuitImage: 'pv-sensor-07-pir-circuit.png',
      outputImage: '',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '08-ultrasonic-sensor',
      title: 'Ultrasonic Sensor (HC-SR04)',
      category: 'sensor',
      icon: '📏',
      description: 'Measures distance to the nearest object with an HC-SR04 (trigger on Pin 9, echo on Pin 10) and prints the live distance in centimetres to the Serial Monitor.',
      image: 'pv-sensor-08-ultrasonic-circuit.png',
      circuitImage: 'pv-sensor-08-ultrasonic-circuit.png',
      outputImage: '',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '09-Tilt-sensor',
      title: 'Tilt Sensor',
      category: 'sensor',
      icon: '📐',
      description: 'Reads a tilt switch on Digital Pin 2 (using the Arduino internal pull-up) and prints "Tilt Detected!" or "No Tilt" depending on orientation.',
      image: 'pv-sensor-09-tilt-circuit.png',
      circuitImage: 'pv-sensor-09-tilt-circuit.png',
      outputImage: '',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '10-Push-button',
      title: 'Push Button',
      category: 'sensor',
      icon: '🔘',
      description: 'Reads a push button on Digital Pin 2 with the internal pull-up resistor enabled and streams its pressed/released state to the Serial Monitor.',
      image: 'pv-sensor-10-button-circuit.png',
      circuitImage: 'pv-sensor-10-button-circuit.png',
      outputImage: '',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '03-LDR-Automatic-Light',
      title: 'LDR Automatic Light',
      category: 'sensor',
      icon: '🔆',
      description: 'Uses an LDR on A0 to measure ambient light and automatically switches an LED on Digital Pin 13 on in darkness and off in bright light.',
      image: 'pv-sensor-03-ldr.png',
      circuitImage: 'pv-sensor-03-ldr.png',
      outputImage: '',
    },

    // --- ⚙️ Actuator & Output Projects (from Actuator-Projects repo) ---
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '01-LED-Blink',
      title: 'LED Blink',
      category: 'actuator',
      icon: '💡',
      description: 'The classic first embedded program — blinks an LED on Digital Pin 13, ON for one second and OFF for one second, continuously.',
      image: 'pv-actuator-01-led-blink-circuit.png',
      circuitImage: 'pv-actuator-01-led-blink-circuit.png',
      outputImage: '',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '02-Buzzer',
      title: 'Buzzer',
      category: 'actuator',
      icon: '🔊',
      description: 'Drives a buzzer on Digital Pin 8, switching it on and off every 500 milliseconds to produce a repeating alert tone.',
      image: 'pv-actuator-02-buzzer-circuit.png',
      circuitImage: 'pv-actuator-02-buzzer-circuit.png',
      outputImage: '',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '03-Hobby-motor',
      title: 'Hobby Motor',
      category: 'actuator',
      icon: '⚙️',
      description: 'Switches a hobby/DC motor on and off through an NPN transistor driven from Digital Pin 8, with a flyback diode protecting the circuit from voltage spikes.',
      image: 'pv-actuator-03-hobby-motor-circuit.png',
      circuitImage: 'pv-actuator-03-hobby-motor-circuit.png',
      outputImage: '',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '04-RGB-LED',
      title: 'RGB LED',
      category: 'actuator',
      icon: '🌈',
      description: 'Cycles an RGB LED channels (Pins 9, 10, 11) one second apart to produce red green blue color transitions.',
      image: 'pv-actuator-04-rgb-led-circuit.png',
      circuitImage: 'pv-actuator-04-rgb-led-circuit.png',
      outputImage: '',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '05-NeoPixel',
      title: 'NeoPixel',
      category: 'actuator',
      icon: '✨',
      description: 'Drives an addressable NeoPixel strip using the Adafruit NeoPixel library to produce custom per-pixel RGB color effects.',
      image: 'pv-actuator-05-neopixel-circuit.png',
      circuitImage: 'pv-actuator-05-neopixel-circuit.png',
      outputImage: '',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '06-LCD',
      title: '16×2 LCD Display',
      category: 'actuator',
      icon: '🖥️',
      description: 'Wires a 16×2 character LCD in 4-bit mode (RS, E and 4 data lines) and displays custom text on screen.',
      image: 'pv-actuator-06-lcd.png',
      circuitImage: 'pv-actuator-06-lcd.png',
      outputImage: '',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '07-DC-motor',
      title: 'DC Motor',
      category: 'actuator',
      icon: '🌀',
      description: 'Controls a DC motor through a motor driver on Digital Pin 9, running it for 2 seconds and stopping it for 2 seconds in a repeating cycle.',
      image: 'pv-actuator-07-dc-motor-circuit.png',
      circuitImage: 'pv-actuator-07-dc-motor-circuit.png',
      outputImage: '',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '08-Servo-Motor',
      title: 'Servo Motor',
      category: 'actuator',
      icon: '🦾',
      description: 'Sweeps a micro servo motor through 0°, 90° and 180° using PWM signals on Digital Pin 9, pausing one second at each position.',
      image: 'pv-actuator-08-servo-motor-circuit.png',
      circuitImage: 'pv-actuator-08-servo-motor-circuit.png',
      outputImage: '',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '09-Segment-display',
      title: '7-Segment Display',
      category: 'actuator',
      icon: '🔢',
      description: 'Displays digits 0–9 on a common-cathode 7-segment display using 7 digital pins and current-limiting resistors.',
      image: 'pv-actuator-09-segment.png',
      circuitImage: 'pv-actuator-09-segment.png',
      outputImage: '',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '10-Vibration',
      title: 'Vibration Motor',
      category: 'actuator',
      icon: '☇',
      description: 'Activates a vibration motor on Digital Pin 8 in a repeating ON-OFF cycle to demonstrate haptic output control.',
      image: 'pv-actuator-10-vibration.png',
      circuitImage: 'pv-actuator-10-vibration.png',
      outputImage: '',
    },
    // --- 📡 ESP32 Projects (from ESP32-Wokwi-Projects repo) ---
    {
      githubRepo: 'ESP32-Wokwi-Projects',
      repoPath: '01-LED-Blink',
      title: 'ESP32 LED Blink',
      category: 'esp32',
      icon: '💡',
      description: 'Blinks the ESP32 onboard LED (GPIO2 / LED_BUILTIN) on and off every second using ESP-IDF v5.x and FreeRTOS.',
      image: 'pv-actuator-01-led-blink-circuit.png',
      circuitImage: 'pv-actuator-01-led-blink-circuit.png',
      outputImage: '',
    },
    {
      githubRepo: 'ESP32-Wokwi-Projects',
      repoPath: '02-Active-Buzzer',
      title: 'ESP32 Active Buzzer',
      category: 'esp32',
      icon: '🔊',
      description: 'Drives an active buzzer on GPIO15 to produce continuous alert tones using ESP-IDF GPIO driver and FreeRTOS tasks.',
      image: 'images/buzzer.png',
      circuitImage: '',
      outputImage: '',
    },
    {
      githubRepo: 'ESP32-Wokwi-Projects',
      repoPath: '03-potentiometer',
      title: 'ESP32 Potentiometer (ADC)',
      category: 'esp32',
      icon: '🎚️',
      description: 'Reads a potentiometer on GPIO34 (ADC1_CH6) using the ESP-IDF ADC oneshot API and prints the live voltage and raw ADC value.',
      image: 'pv-sensor-05-pot-circuit.png',
      circuitImage: '',
      outputImage: '',
    },
    {
      githubRepo: 'ESP32-Wokwi-Projects',
      repoPath: '04-Push-Button-LED',
      title: 'ESP32 Push Button + LED',
      category: 'esp32',
      icon: '🔘',
      description: 'Controls an LED on GPIO2 with a push button on GPIO4 (input with pull-up) — button press toggles the LED state and logs to the console.',
      image: 'images/led-blink.png',
      circuitImage: '',
      outputImage: '',
    },
    {
      githubRepo: 'ESP32-Wokwi-Projects',
      repoPath: '05-Relay-Module',
      title: 'ESP32 Relay Module',
      category: 'esp32',
      icon: '🔌',
      description: 'Toggles a relay on GPIO23 every 1 second, logging "Relay ON" and "Relay OFF" to the ESP-IDF console.',
      image: 'pv-actuator-10-vibration.png',
      circuitImage: '',
      outputImage: '',
    },
    {
      githubRepo: 'ESP32-Wokwi-Projects',
      repoPath: '06-RGB-LED-Control',
      title: 'ESP32 RGB LED Control',
      category: 'esp32',
      icon: '🌈',
      description: 'Cycles RED (GPIO25), GREEN (GPIO26), BLUE (GPIO27) and all-OFF every 1 second using ESP-IDF LEDC PWM with 16-bit resolution.',
      image: 'pv-actuator-04-rgb-led-circuit.png',
      circuitImage: '',
      outputImage: '',
    },
    {
      githubRepo: 'ESP32-Wokwi-Projects',
      repoPath: '07-servo-motor',
      title: 'ESP32 Servo Motor',
      category: 'esp32',
      icon: '🦾',
      description: 'Drives an SG90 servo on GPIO18 using ESP-IDF LEDC PWM (channel 0, 50 Hz) to sweep 0°-180° and back continuously.',
      image: 'pv-actuator-08-servo-motor-circuit.png',
      circuitImage: '',
      outputImage: '',
    },

    // --- 🔄 Sensor + Actuator Projects (from one-sensor-one-actuator repo) ---
    {
      githubRepo: 'one-sensor-one-actuator',
      repoPath: '01-Automatic-fan',
      title: 'Automatic Fan',
      category: 'combo',
      icon: '🌬️',
      description: 'A TMP36 temperature sensor on A0 automatically switches a fan motor on once the temperature rises above 30°C, and off again once it cools down.',
      image: 'pv-combo-10-auto-fan.png',
      circuitImage: 'pv-combo-10-auto-fan.png',
      outputImage: '',
    },
    {
      githubRepo: 'one-sensor-one-actuator',
      repoPath: '02-Smart-dustbin',
      title: 'Smart Dustbin',
      category: 'combo',
      icon: '🗑️',
      description: 'An ultrasonic sensor automatically opens a servo-driven lid when a hand or waste is detected within 20cm, while an LDR-triggered buzzer flags low-light conditions.',
      image: 'pv-combo-11-smart-dustbin.png',
      circuitImage: 'pv-combo-11-smart-dustbin.png',
      outputImage: '',
    },
    {
      githubRepo: 'one-sensor-one-actuator',
      repoPath: '03-Parking-gate',
      title: 'Parking Gate',
      category: 'combo',
      icon: '🚧',
      description: 'An ultrasonic sensor and a pushbutton together raise a servo-driven gate and light an indicator LED only when a vehicle is close by and authorized to enter.',
      image: 'pv-combo-12-parking-gate.png',
      circuitImage: 'pv-combo-12-parking-gate.png',
      outputImage: '',
    },
    {
      githubRepo: 'one-sensor-one-actuator',
      repoPath: '04-Fire-alarm',
      title: 'Fire Alarm',
      category: 'combo',
      icon: '🔥',
      description: 'A TMP36 temperature sensor lights a warning LED once heat crosses a threshold, while a separate LDR-based light reading drives a buzzer alarm.',
      image: 'pv-combo-13-fire-alarm.png',
      circuitImage: 'pv-combo-13-fire-alarm.png',
      outputImage: '',
    },
    {
      githubRepo: 'one-sensor-one-actuator',
      repoPath: '05-Security-alarm',
      title: 'Security Alarm',
      category: 'combo',
      icon: '🛎️',
      description: 'A PIR motion sensor or a manual pushbutton — either one — triggers an LED and buzzer alarm together, so the alarm can fire automatically or be armed by hand.',
      image: 'pv-combo-14-security-alarm.png',
      circuitImage: 'pv-combo-14-security-alarm.png',
      outputImage: '',
    },
    {
      githubRepo: 'one-sensor-one-actuator',
      repoPath: '06-Gas-leak-alarm',
      title: 'Gas Leak Alarm',
      category: 'combo',
      icon: '💨',
      description: 'An MQ-2 gas sensor on A0 triggers a buzzer once the gas reading exceeds 400, with the value printed to the Serial Monitor for monitoring.',
      image: 'pv-combo-15-gas-leak.png',
      circuitImage: 'pv-combo-15-gas-leak.png',
      outputImage: '',
    },
    // --- 💻 Software Projects ---
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'even-odd',
      title: 'Even or Odd',
      category: 'software',
      icon: '🔢',
      description: 'A Go program that determines whether a given number is even or odd, with a multi-stage Dockerfile for containerized execution.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'leap-year',
      title: 'Leap Year Checker',
      category: 'software',
      icon: '📅',
      description: 'A Go program that checks if a year is a leap year using the standard Gregorian calendar rules, packaged with Docker.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'armstrong-number',
      title: 'Armstrong Number Checker',
      category: 'software',
      icon: '🧮',
      description: 'A Go program that checks whether a number is an Armstrong (narcissistic) number, with a multi-stage Docker build.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'gcd',
      title: 'Greatest Common Divisor',
      category: 'software',
      icon: '➗',
      description: 'A Go program that calculates the GCD of two numbers using the Euclidean algorithm, with a Dockerfile.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'lcm',
      title: 'Least Common Multiple',
      category: 'software',
      icon: '🔗',
      description: 'A Go program that calculates the LCM of two numbers using the GCD formula, packaged with Docker.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'temperature-converter',
      title: 'Temperature Converter',
      category: 'software',
      icon: '🌡️',
      description: 'A Go program that converts Celsius to Fahrenheit and Kelvin, with a multi-stage Docker build.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'currency-converter',
      title: 'Currency Converter',
      category: 'software',
      icon: '💱',
      description: 'A Go program that converts between USD, EUR, GBP, JPY, INR, CAD, and AUD using fixed exchange rates, with Docker support.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'multiplication-table',
      title: 'Multiplication Table',
      category: 'software',
      icon: '✖️',
      description: 'A Go program that prints the multiplication table for a given number from 1 to 10, packaged with a Dockerfile.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'largest-of-three',
      title: 'Largest of Three Numbers',
      category: 'software',
      icon: '🥇',
      description: 'A Go program that finds the largest number among three given numbers, with a multi-stage Docker build.',
    },
    {
      githubRepo: 'go-docker-practice',
      repoPath: 'vowel-counter',
      title: 'Vowel Counter',
      category: 'software',
      icon: '🔤',
      description: 'A Go program that counts the number of vowels in a given string, packaged with a Dockerfile.',
    },
  ],
  // ---------------------------------------------------------
  // PM-VIKAS PROJECT CATEGORIES — powers the "Projects" grid
  // INSIDE pmvikas.html only (#pmVikasProjectsRoot). Kept totally
  // separate from projectCategories/featuredProjects above so
  // these never appear on projects.html or the index.html
  // "Projects" section — by design, they only live inside PM-VIKAS.
  // Don't rename the `key` values without updating every project's
  // `category` field below to match.
  // ---------------------------------------------------------
  pmVikasProjectCategories: [
    {
      key: 'pv-sensor',
      icon: '📡',
      title: 'Sensor Projects',
      description: 'Individual sensors read on an Arduino Uno and reported over the Serial Monitor — from flex and force sensors to ultrasonic distance and PIR motion.',
    },
    {
      key: 'pv-actuator',
      icon: '⚙️',
      title: 'Actuator Projects',
      description: 'Output devices driven directly by the Arduino — LEDs, buzzers, motors, displays and addressable LED strips.',
    },
    {
      key: 'pv-combo',
      icon: '🔄',
      title: 'Sensor + Actuator Projects',
      description: 'Full mini-systems where one or more sensors feed live readings into an Arduino that automatically drives an actuator or output in response.',
    },
  ],

  // ---------------------------------------------------------
  // PM-VIKAS PROJECTS — every individual project pulled from the
  // 4 GitHub repos below, shown ONLY inside pmvikas.html:
  //   • Sonacatherine06/Actuator-Projects        -> pv-actuator
  //   • Sonacatherine06/Sensor_Projects           -> pv-sensor
  //     (the repo is named "Sensor_Projects" with an underscore —
  //     not "Sensor_Projectst", which doesn't exist on GitHub)
  //   • Sonacatherine06/Multiple-Sensor-Actuator  -> pv-combo
  //   • Sonacatherine06/one-sensor-one-actuator   -> pv-combo
  //
  // Field reference is the same as `featuredProjects` above, plus:
  //   icon — an emoji shown on the card in place of the category
  //          icon, chosen to match this specific project's hardware
  //          (falls back to the category icon if omitted)
  // ---------------------------------------------------------
  pmVikasProjects: [
    // --- 📡 Sensor Projects (Sensor_Projects repo) ---
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '01-flex-sensor',
      title: 'Flex Sensor',
      category: 'pv-sensor',
      icon: '🦴',
      description: 'Reads the bend of a flex sensor on analog pin A0 and prints the live resistance-based ADC value to the Serial Monitor as it flexes.',
      image: 'pv-sensor-01-flex-circuit.png',
      circuitImage: 'pv-sensor-01-flex-circuit.png',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '02-forcesensor',
      title: 'Force Sensor (FSR)',
      category: 'pv-sensor',
      icon: '👆',
      description: 'Reads a force-sensitive resistor on A0 and prints the applied-pressure value to the Serial Monitor as force increases or decreases.',
      image: 'pv-sensor-02-force-circuit.png',
      circuitImage: 'pv-sensor-02-force-circuit.png',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '03-LDR-Automatic-Light',
      title: 'LDR Automatic Light',
      category: 'pv-sensor',
      icon: '🔆',
      description: 'Uses an LDR on A0 to measure ambient light and automatically switches an LED on Digital Pin 13 on in darkness and off in bright light.',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '04-Microphone-sensor',
      title: 'Microphone Sensor',
      category: 'pv-sensor',
      icon: '🎤',
      description: 'Reads sound intensity from a microphone sensor module and streams the live analog value to the Serial Monitor.',
      image: 'pv-sensor-04-mic-circuit.png',
      circuitImage: 'pv-sensor-04-mic-circuit.png',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '05-Potentiometer',
      title: 'Potentiometer',
      category: 'pv-sensor',
      icon: '🎚️',
      description: 'Reads the wiper position of a potentiometer on A0 and prints the analog value (0–1023) to the Serial Monitor as it\'s turned.',
      image: 'pv-sensor-05-pot-circuit.png',
      circuitImage: 'pv-sensor-05-pot-circuit.png',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '06-Temperature-sensor',
      title: 'Temperature Sensor (TMP36)',
      category: 'pv-sensor',
      icon: '🌡️',
      description: 'Converts a TMP36 analog sensor\'s voltage output into degrees Celsius and prints the live temperature to the Serial Monitor.',
      image: 'pv-sensor-06-temp.png',
      circuitImage: 'pv-sensor-06-temp.png',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '07-PIR-sensor',
      title: 'PIR Motion Sensor',
      category: 'pv-sensor',
      icon: '🕵️',
      description: 'Detects human movement with a PIR sensor on Digital Pin 2, driving an output on Pin 9 and logging "Motion Detected" / "No Motion" to the Serial Monitor.',
      image: 'pv-sensor-07-pir-circuit.png',
      circuitImage: 'pv-sensor-07-pir-circuit.png',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '08-ultrasonic-sensor',
      title: 'Ultrasonic Sensor (HC-SR04)',
      category: 'pv-sensor',
      icon: '📏',
      description: 'Measures distance to the nearest object with an HC-SR04 (trigger on Pin 9, echo on Pin 10) and prints the live distance in centimetres to the Serial Monitor.',
      image: 'pv-sensor-08-ultrasonic-circuit.png',
      circuitImage: 'pv-sensor-08-ultrasonic-circuit.png',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '09-Tilt-sensor',
      title: 'Tilt Sensor',
      category: 'pv-sensor',
      icon: '📐',
      description: 'Reads a tilt switch on Digital Pin 2 (using the Arduino\'s internal pull-up) and prints "Tilt Detected!" or "No Tilt" depending on orientation.',
      image: 'pv-sensor-09-tilt-circuit.png',
      circuitImage: 'pv-sensor-09-tilt-circuit.png',
    },
    {
      githubRepo: 'Sensor_Projects',
      repoPath: '10-Push-button',
      title: 'Push Button',
      category: 'pv-sensor',
      icon: '🔘',
      description: 'Reads a push button on Digital Pin 2 with the internal pull-up resistor enabled and streams its pressed/released state to the Serial Monitor.',
      image: 'pv-sensor-10-button-circuit.png',
      circuitImage: 'pv-sensor-10-button-circuit.png',
    },

    // --- ⚙️ Actuator Projects (Actuator-Projects repo) ---
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '01-LED-Blink',
      title: 'LED Blink',
      category: 'pv-actuator',
      icon: '💡',
      description: 'The classic first embedded program — blinks an LED on Digital Pin 13, ON for one second and OFF for one second, continuously.',
      image: 'pv-actuator-01-led-blink-circuit.png',
      circuitImage: 'pv-actuator-01-led-blink-circuit.png',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '02-Buzzer',
      title: 'Buzzer',
      category: 'pv-actuator',
      icon: '🔊',
      description: 'Drives a buzzer on Digital Pin 8, switching it on and off every 500 milliseconds to produce a repeating alert tone.',
      image: 'pv-actuator-02-buzzer-circuit.png',
      circuitImage: 'pv-actuator-02-buzzer-circuit.png',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '03-Hobby-motor',
      title: 'Hobby Motor',
      category: 'pv-actuator',
      icon: '⚙️',
      description: 'Switches a hobby/DC motor on and off through an NPN transistor driven from Digital Pin 8, with a flyback diode protecting the circuit from voltage spikes.',
      image: 'pv-actuator-03-hobby-motor-circuit.png',
      circuitImage: 'pv-actuator-03-hobby-motor-circuit.png',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '04-RGB-LED',
      title: 'RGB LED',
      category: 'pv-actuator',
      icon: '🌈',
      description: 'Cycles an RGB LED\'s red, green and blue channels (Pins 9, 10, 11) one second apart to produce red → green → blue color transitions.',
      image: 'pv-actuator-04-rgb-led-circuit.png',
      circuitImage: 'pv-actuator-04-rgb-led-circuit.png',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '05-NeoPixel',
      title: 'NeoPixel',
      category: 'pv-actuator',
      icon: '✨',
      description: 'Drives an addressable NeoPixel ring on pin D6 using the Adafruit NeoPixel library to produce custom per-pixel RGB color effects.',
      image: 'pv-actuator-05-neopixel-circuit.png',
      circuitImage: 'pv-actuator-05-neopixel-circuit.png',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '06-LCD',
      title: '16×2 LCD Display',
      category: 'pv-actuator',
      icon: '🖥️',
      description: 'Wires a 16×2 character LCD in 4-bit mode (RS, E and 4 data lines) and displays custom text — "Hello Sona" — on screen.',
      image: 'pv-actuator-06-lcd.png',
      circuitImage: 'pv-actuator-06-lcd.png',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '07-DC-motor',
      title: 'DC Motor',
      category: 'pv-actuator',
      icon: '⚙️',
      description: 'Controls a DC motor through a motor driver on Digital Pin 9, running it for 2 seconds and stopping it for 2 seconds in a repeating cycle.',
      image: 'pv-actuator-07-dc-motor-circuit.png',
      circuitImage: 'pv-actuator-07-dc-motor-circuit.png',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '08-Servo-Motor',
      title: 'Servo Motor',
      category: 'pv-actuator',
      icon: '🦾',
      description: 'Sweeps a micro servo motor through 0°, 90° and 180° using PWM signals on Digital Pin 9, pausing one second at each position.',
      image: 'pv-actuator-08-servo-motor-circuit.png',
      circuitImage: 'pv-actuator-08-servo-motor-circuit.png',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '09-Segment-display',
      title: '7-Segment Display',
      category: 'pv-actuator',
      icon: '🔢',
      description: 'Displays digits 0–9 on a common-cathode 7-segment display, cycling through all ten values with a 1-second delay between each.',
      image: 'pv-actuator-09-segment.png',
      circuitImage: 'pv-actuator-09-segment.png',
    },
    {
      githubRepo: 'Actuator-Projects',
      repoPath: '10-Vibration',
      title: 'Vibration Motor',
      category: 'pv-actuator',
      icon: '☇',
      description: 'Activates a vibration motor on Digital Pin 8 in a repeating ON-OFF cycle to demonstrate haptic output control.',
      image: 'pv-actuator-10-vibration.png',
      circuitImage: 'pv-actuator-10-vibration.png',
    },

    // --- 🔄 Sensor + Actuator Projects (Multiple-Sensor-Actuator repo) ---
    {
      githubRepo: 'Multiple-Sensor-Actuator',
      repoPath: '01-Smart-Irrigation',
      title: 'Smart Irrigation System',
      category: 'pv-combo',
      icon: '🌱',
      description: 'Reads soil moisture and a TMP36 temperature sensor, then automatically switches on a water pump and opens a servo-driven valve whenever the soil is dry.',
      image: 'pv-combo-01-irrigation.png',
      circuitImage: 'pv-combo-01-irrigation.png',
    },
    {
      githubRepo: 'Multiple-Sensor-Actuator',
      repoPath: '02-Automatic-street-light+security-alarm',
      title: 'Automatic Street Light + Security Alarm',
      category: 'pv-combo',
      icon: '🚨',
      description: 'An LDR automatically switches a street light on in low light, while a separate PIR sensor triggers a buzzer security alarm whenever motion is detected.',
      image: 'pv-combo-02-street-light-alarm.png',
      circuitImage: 'pv-combo-02-street-light-alarm.png',
    },
    {
      githubRepo: 'Multiple-Sensor-Actuator',
      repoPath: '03-Automatic-Door',
      title: 'Automatic Door',
      category: 'pv-combo',
      icon: '🚪',
      description: 'Combines an HC-SR04 ultrasonic sensor with a PIR motion sensor to open a servo-driven door and sound a buzzer chime whenever someone approaches within range.',
      image: 'pv-combo-03-auto-door.png',
      circuitImage: 'pv-combo-03-auto-door.png',
    },
    {
      githubRepo: 'Multiple-Sensor-Actuator',
      repoPath: '04-Alcohol-Detection-Engine-Lock-System',
      title: 'Alcohol Detection Engine Lock System',
      category: 'pv-combo',
      icon: '🍺',
      description: 'An alcohol sensor on A0 locks the engine motor and lights a red LED with a buzzer above a set threshold; below it, a green LED lights and the motor runs normally.',
      image: 'pv-combo-04-alcohol-lock.png',
      circuitImage: 'pv-combo-04-alcohol-lock.png',
    },
    {
      githubRepo: 'Multiple-Sensor-Actuator',
      repoPath: '05-Automatic-Plant-Watering-System',
      title: 'Automatic Plant Watering System',
      category: 'pv-combo',
      icon: '🪴',
      description: 'Compares a live soil-moisture reading against a potentiometer-set threshold to automatically switch on a water pump and indicator LED when the soil is too dry.',
      image: 'pv-combo-05-plant-watering.png',
      circuitImage: 'pv-combo-05-plant-watering.png',
    },
    {
      githubRepo: 'Multiple-Sensor-Actuator',
      repoPath: '06-Smart-parking-system',
      title: 'Smart Parking System',
      category: 'pv-combo',
      icon: '🅿️',
      description: 'An ultrasonic sensor and pushbutton together control a servo gate and green/red LED indicators, sounding a buzzer whenever the parking lot is marked full.',
      image: 'pv-combo-06-smart-parking.png',
      circuitImage: 'pv-combo-06-smart-parking.png',
    },
    {
      githubRepo: 'Multiple-Sensor-Actuator',
      repoPath: '07-Smart-energy-saving-room-system',
      title: 'Smart Energy Saving Room System',
      category: 'pv-combo',
      icon: '💡',
      description: 'A PIR motion sensor turns room lighting on only when someone is present, while an LDR reading drives a servo-operated curtain based on ambient light levels.',
      image: 'pv-combo-07-energy-room.png',
      circuitImage: 'pv-combo-07-energy-room.png',
    },
    {
      githubRepo: 'Multiple-Sensor-Actuator',
      repoPath: '08-Smart-temperature-fan-system',
      title: 'Smart Temperature Fan System',
      category: 'pv-combo',
      icon: '🌬️',
      description: 'An LM35 temperature sensor is compared against a potentiometer-set threshold to automatically switch on a cooling fan and LED indicator once the room gets too warm.',
      image: 'pv-combo-08-temp-fan.png',
      circuitImage: 'pv-combo-08-temp-fan.png',
    },
    {
      githubRepo: 'Multiple-Sensor-Actuator',
      repoPath: '09-Happy-Birthday',
      title: 'Happy Birthday Display',
      category: 'pv-combo',
      icon: '🎉',
      description: 'Scrolls "HAPPY BIRTHDAY" across a 16×2 LCD while flashing a 12-LED array on and off in sync, driven together from a single Arduino Uno.',
      image: 'pv-combo-09-happy-birthday.png',
      circuitImage: 'pv-combo-09-happy-birthday.png',
    },

    // --- 🔄 Sensor + Actuator Projects (one-sensor-one-actuator repo) ---
    {
      githubRepo: 'one-sensor-one-actuator',
      repoPath: '01-Automatic-fan',
      title: 'Automatic Fan',
      category: 'pv-combo',
      icon: '🌬️',
      description: 'A TMP36 temperature sensor on A0 automatically switches a fan motor on once the temperature rises above 30°C, and off again once it cools down.',
      image: 'pv-combo-10-auto-fan.png',
      circuitImage: 'pv-combo-10-auto-fan.png',
    },
    {
      githubRepo: 'one-sensor-one-actuator',
      repoPath: '02-Smart-dustbin',
      title: 'Smart Dustbin',
      category: 'pv-combo',
      icon: '🗑️',
      description: 'An ultrasonic sensor automatically opens a servo-driven lid when a hand or waste is detected within 20cm, while an LDR-triggered buzzer flags low-light conditions.',
      image: 'pv-combo-11-smart-dustbin.png',
      circuitImage: 'pv-combo-11-smart-dustbin.png',
    },
    {
      githubRepo: 'one-sensor-one-actuator',
      repoPath: '03-Parking-gate',
      title: 'Parking Gate',
      category: 'pv-combo',
      icon: '🚧',
      description: 'An ultrasonic sensor and a pushbutton together raise a servo-driven gate and light an indicator LED only when a vehicle is close by and authorized to enter.',
      image: 'pv-combo-12-parking-gate.png',
      circuitImage: 'pv-combo-12-parking-gate.png',
    },
    {
      githubRepo: 'one-sensor-one-actuator',
      repoPath: '04-Fire-alarm',
      title: 'Fire Alarm',
      category: 'pv-combo',
      icon: '🔥',
      description: 'A TMP36 temperature sensor lights a warning LED once heat crosses a threshold, while a separate LDR-based light reading drives a buzzer alarm.',
      image: 'pv-combo-13-fire-alarm.png',
      circuitImage: 'pv-combo-13-fire-alarm.png',
    },
    {
      githubRepo: 'one-sensor-one-actuator',
      repoPath: '05-Security-alarm',
      title: 'Security Alarm',
      category: 'pv-combo',
      icon: '🛎️',
      description: 'A PIR motion sensor or a manual pushbutton — either one — triggers an LED and buzzer alarm together, so the alarm can fire automatically or be armed by hand.',
      image: 'pv-combo-14-security-alarm.png',
      circuitImage: 'pv-combo-14-security-alarm.png',
    },
    {
      githubRepo: 'one-sensor-one-actuator',
      repoPath: '06-Gas-leak-alarm',
      title: 'Gas Leak Alarm',
      category: 'pv-combo',
      icon: '💨',
      description: 'An MQ-2 gas sensor on A0 triggers a buzzer once the gas reading exceeds 400, with the value printed to the Serial Monitor for monitoring.',
      image: 'pv-combo-13-fire-alarm.png',
      circuitImage: 'pv-combo-13-fire-alarm.png',
    },
    {
      githubRepo: 'one-sensor-one-actuator',
      repoPath: '07-Motion-detection-light',
      title: 'Motion Detection Light',
      category: 'pv-combo',
      icon: '🕵️',
      description: 'A PIR motion sensor on Digital Pin 2 turns an LED on Digital Pin 13 on when motion is detected, with no serial output.',
      image: 'pv-combo-14-security-alarm.png',
      circuitImage: 'pv-combo-14-security-alarm.png',
    },
    {
      githubRepo: 'one-sensor-one-actuator',
      repoPath: '08-Parking-distance',
      title: 'Parking Distance Warning',
      category: 'pv-combo',
      icon: '📏',
      description: 'An HC-SR04 ultrasonic sensor on Pins 9/10 measures distance and sounds a 1000-Hz buzzer tone on Pin 8 when an object comes within 10 cm, with a 100 ms loop delay.',
      image: 'pv-combo-12-parking-gate.png',
      circuitImage: 'pv-combo-12-parking-gate.png',
    },
    {
      githubRepo: 'one-sensor-one-actuator',
      repoPath: '09-Soil-moisture-indicator',
      title: 'Soil Moisture Indicator',
      category: 'pv-combo',
      icon: '🪴',
      description: 'Reads soil moisture on analog pin A0 and rotates a servo to 90° when moisture drops below 500, otherwise resets to 0°, with readings printed to the Serial Monitor.',
      image: 'pv-combo-05-plant-watering.png',
      circuitImage: 'pv-combo-05-plant-watering.png',
    },
    {
      githubRepo: 'one-sensor-one-actuator',
      repoPath: '10-water-level-indicator',
      title: 'Water Level Indicator',
      category: 'pv-combo',
      icon: '💧',
      description: 'An HC-SR04 ultrasonic sensor on Pins 9/10 measures water level, turning on an LED on Pin 13 when distance is 10 cm or less, printing readings to the Serial Monitor.',
      image: 'pv-combo-01-irrigation.png',
      circuitImage: 'pv-combo-01-irrigation.png',
    },
  ],
};

// Convenience alias matching the config shape requested for the GitHub
// integration — same data as PORTFOLIO.featuredProjects, just exposed
// under its own name too.
const featuredProjects = PORTFOLIO.featuredProjects;
