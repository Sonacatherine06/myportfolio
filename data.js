/* ============================================================
   data.js — site configuration + calendar seed data
   Loaded as a plain classic script (no import/export) so the
   site works by double-clicking index.html — ES modules are
   blocked by browsers when loaded from a file:// URL.
   ============================================================ */

// Local admin password, used when the site is opened directly
// (file:// or Live Server) with no backend available.
// When deployed to Vercel, /api/login checks the real
// ADMIN_PASSWORD environment variable instead — this local
// value is only a fallback for offline / local-file use.
const APP_CONFIG = {
  LOCAL_ADMIN_PASSWORD: 'demo123',
  CALENDAR_STORAGE_KEY: 'pmvikas_calendar_v1',
};

// Seed content for the PM-VIKAS activity calendar, exactly as
// logged by the intern. Used as the starting dataset and as the
// fallback shown the very first time no saved data exists yet
// (in Vercel KV, or in this browser's local storage).
//
// Each entry has:
//   title       — short heading shown on the card
//   module      — curriculum module (see MODULE_LABELS below)
//   description — one-line summary (kept for backward compat)
//   summary     — 2-line description shown in the collapsed card
//   bullets     — 3–5 concise bullet points shown when the card
//                 is expanded. Falls back to [description] if
//                 the field is missing.
const DEFAULT_CALENDAR_LOG = {
  '2026-06-19': {
    title: 'Introduction to IoT & Ecosystem',
    module: 'Electronics',
    description: 'Inauguration of the PM-VIKAS IoT assistant training program. Introduced to IoT nodes, device-to-cloud architectures, real-world smart systems (cities, grid networks), and communication layers.',

    summary: [
      'Inauguration of the PM-VIKAS IoT Assistant training program at IIIT Kottayam.',
      'Introduced to IoT node architectures and device-to-cloud communication layers.',
    ],
    bullets: [
      'Attended the inauguration of the PM-VIKAS IoT Assistant training program at IIIT Kottayam',
      'Learned about IoT node architectures and device-to-cloud communication layers',
      'Studied real-world smart system applications: smart cities and grid networks',
      'Understood the end-to-end IoT ecosystem from sensor to cloud',
    ],
  },
  '2026-06-20': {
    title: 'Microcontroller Architectures & IDE',
    module: 'Electronics',
    description: 'Study of Arduino Uno and ESP32 board layouts. Installation of Arduino IDE software, configuring port selections, writing basic C script routines, and flashing standard status LED programs.',

    summary: [
      'Studied Arduino Uno and ESP32 board layouts and pin configurations.',
      'Installed Arduino IDE, configured ports, and flashed basic LED programs.',
    ],
    bullets: [
      'Compared Arduino Uno and ESP32 board layouts and pin configurations',
      'Installed the Arduino IDE and configured board/port selections',
      'Wrote basic C routines for GPIO control',
      'Flashed standard LED blink programs to verify toolchain setup',
    ],
  },
  '2026-06-22': {
    title: 'Basic Electronic Components',
    module: 'Electronics',
    description: 'Detailed analysis of electronic devices including Resistors, Capacitors, and Light Emitting Diodes (LEDs). Practical hands-on breadboard wiring configurations and simple circuit design rules.',

    summary: [
      'Analyzed operating principles of resistors, capacitors, and LEDs.',
      'Built breadboard circuits and applied Kirchhoff's laws to test circuits.',
    ],
    bullets: [
      'Analyzed operating principles of resistors, capacitors, and LEDs',
      'Measured component values using colour codes and a multimeter',
      'Built basic breadboard circuits with proper wiring conventions',
      'Applied Kirchhoff\'s laws to verify voltage and current in test circuits',
    ],
  },
  '2026-06-23': {
    title: 'Hardware Measurement & GPIOs',
    module: 'Electronics',
    description: 'Configuring and testing digital/analog General Purpose Input/Output (GPIO) pins. Measuring voltage, loop currents, and resistance values across wired test circuits using a digital multimeter.',

    summary: [
      'Configured digital and analog GPIO pins on the development board.',
      'Measured voltage, loop currents, and resistance with a multimeter.',
    ],
    bullets: [
      'Configured digital and analog GPIO pins on the development board',
      'Measured voltage levels across wired test circuits with a multimeter',
      'Verified loop currents and resistance values for sensor interfacing',
      'Tested GPIO pin states (HIGH/LOW) with LEDs and push-buttons',
    ],
  },
  '2026-06-24': {
    title: 'Interfacing LDR (Light Sensors)',
    module: 'IoT Projects',
    description: 'Interfacing Light Dependent Resistors (LDR) to read changing analog light intensity levels. Programmed thresholds to trigger output alerts based on ambient illumination changes.',

    summary: [
      'Interfaced an LDR sensor to read analog light intensity levels.',
      'Programmed threshold-based triggers for ambient illumination changes.',
    ],
    bullets: [
      'Interfaced an LDR sensor to an analog input pin on the board',
      'Read and calibrated analog light intensity values in real time',
      'Programmed threshold-based triggers for ambient illumination changes',
      'Verified output alerts using LEDs and serial monitor feedback',
    ],
  },
  '2026-06-25': {
    title: 'Interfacing DHT11 Temperature Sensor',
    module: 'IoT Projects',
    description: 'Interfacing the DHT11 sensor to monitor environmental temperature and humidity levels. Written data validation logic to filter out noise fluctuations and format values for transmission.',

    summary: [
      'Connected the DHT11 sensor for temperature and humidity monitoring.',
      'Implemented data validation logic to filter noise from readings.',
    ],
    bullets: [
      'Connected the DHT11 sensor for temperature and humidity monitoring',
      'Implemented data validation logic to filter noise fluctuations',
      'Formatted sensor readings for serial output and cloud transmission',
      'Verified accuracy of readings against ambient conditions',
    ],
  },
  '2026-06-26': {
    title: 'ESP32 Wi-Fi & Network Protocols',
    module: 'Networking',
    description: "Setting up the ESP32 microcontroller's Wi-Fi module. Establishing station (STA) connections to local networks and checking communication protocols (IP addressing, TCP client/server models).",
    summary: [
      'Configured the ESP32 Wi-Fi module in station (STA) mode.',
      'Verified TCP client/server models and network connectivity.',
    ],
    bullets: [
      'Configured the ESP32 Wi-Fi module in station (STA) mode',
      'Connected to a local Wi-Fi network and obtained an IP address',
      'Verified TCP client/server communication models',
      'Tested basic network connectivity with ping and HTTP requests',
    ],
  },
  '2026-06-27': {
    title: 'Blynk IoT Cloud Setup & Auth',
    module: 'Networking',
    description: 'Created developer accounts on Blynk IoT Cloud. Set up device templates, virtual datastreams, and generated secure Authentication Tokens. Configured basic mobile application dashboards.',

    summary: [
      'Created a Blynk IoT Cloud developer account and project.',
      'Set up device templates, datastreams, and generated auth tokens.',
    ],
    bullets: [
      'Created a Blynk IoT Cloud developer account and project',
      'Set up device templates and virtual datastreams for sensor data',
      'Generated secure authentication tokens for device-cloud pairing',
      'Configured a mobile application dashboard with real-time widgets',
    ],
  },
  '2026-06-29': {
    title: 'Real-time Cloud Telemetry (Blynk)',
    module: 'IoT Projects',
    description: 'Programmed the ESP32 to upload environmental parameters (LDR intensity and DHT11 values) to the Blynk Cloud dashboard in real-time. Verified low-latency response and remote app widgets.',

    summary: [
      'Programmed ESP32 to stream LDR and DHT11 data to Blynk Cloud.',
      'Verified real-time data transmission and mobile dashboard widgets.',
    ],
    bullets: [
      'Programmed ESP32 to stream LDR and DHT11 data to Blynk Cloud',
      'Configured real-time data transmission via Wi-Fi',
      'Verified low-latency response on the mobile dashboard',
      'Tested remote app widgets for live sensor monitoring',
    ],
  },
  '2026-06-30': {
    title: 'ThingSpeak Logger & Capstone',
    module: 'IoT Projects',
    description: 'Linked the ESP32 to the ThingSpeak server for long-term data logging and visualization. Assembled the final Capstone Project: an integrated Smart Home System that tracks sensors and controls output relays.',

    summary: [
      'Connected the ESP32 to ThingSpeak for long-term data logging.',
      'Assembled the capstone Smart Home System with sensor tracking and relays.',
    ],
    bullets: [
      'Connected the ESP32 to ThingSpeak for long-term data logging',
      'Configured data visualization channels and real-time graphs',
      'Assembled the capstone Smart Home System with sensor tracking',
      'Implemented relay control for output devices based on sensor input',
      'Integrated all modules into a unified smart home dashboard',
    ],
  },

  '2026-07-01': {
    title: 'Absent',
    module: '',
    status: 'absent',
    description: 'No internship activities were conducted on this day due to absence.',
    summary: [
      'No internship activities conducted due to absence.',
      'No sensor interfacing, circuit work, or cloud tasks performed.',
    ],
    bullets: [
      'No internship activities conducted due to absence',
      'No sensor interfacing or circuit work performed',
      'No cloud or networking tasks completed',
    ],
  },
  '2026-07-02': {
    title: 'Absent',
    module: '',
    status: 'absent',
    description: 'No internship activities were conducted on this day due to absence.',
    summary: [
      'No internship activities conducted due to absence.',
      'No sensor interfacing, circuit work, or cloud tasks performed.',
    ],
    bullets: [
      'No internship activities conducted due to absence',
      'No sensor interfacing or circuit work performed',
      'No cloud or networking tasks completed',
    ],
  },
  '2026-07-03': {
    title: 'Day 13: IEEE Paper Survey & Project Domain Exploration',
    module: 'Research',
    description: 'Conducted a comprehensive literature survey using Google Scholar and the IEEE Xplore Digital Library to explore potential project domains. Studied recent research papers to understand emerging technological trends, identify research gaps, and evaluate innovative solutions across various fields. Analyzed research abstracts, methodologies, proposed architectures, datasets, and future research directions to determine suitable areas for project development. Learned effective techniques for academic paper searching using relevant keywords, publication filters, and citation analysis. This activity provided valuable insights into selecting an appropriate project domain and established a strong foundation for future research-oriented project development.',

    summary: [
      'Conducted a literature survey using Google Scholar and IEEE Xplore.',
      'Analyzed research papers to identify project domains and research gaps.',
    ],
    bullets: [
      'Conducted a literature survey using Google Scholar and IEEE Xplore Digital Library',
      'Explored emerging technological trends and identified research gaps across fields',
      'Analyzed paper methodologies, architectures, datasets, and future directions',
      'Learned keyword-based paper searching with publication and citation filters',
      'Selected a suitable project domain based on novelty and practicality',
    ],
  },
  '2026-07-04': {
    title: 'Day 14: IEEE Paper Analysis & Project Domain Finalization',
    module: 'Research',
    description: 'Continued the literature survey by performing an in-depth analysis of shortlisted IEEE research papers related to the selected project domains. Compared methodologies, implementation techniques, system architectures, datasets, and performance evaluation metrics to understand the strengths and limitations of existing solutions. Identified research gaps and discussed feasible approaches for developing an innovative project. Organized the collected literature for future reference and finalized the project domain after evaluating the novelty, practicality, and research potential of different ideas.',

    summary: [
      'Performed in-depth analysis of shortlisted IEEE research papers.',
      'Finalized the project domain after evaluating novelty and practicality.',
    ],
    bullets: [
      'Performed in-depth analysis of shortlisted IEEE research papers',
      'Compared methodologies, architectures, datasets, and performance metrics',
      'Identified research gaps and evaluated feasibility of existing solutions',
      'Organized collected literature into a structured reference library',
      'Finalized the project domain after evaluating novelty and practicality',
    ],
  },
  '2026-07-06': {
    title: 'Day 15: Networking Fundamentals & Cisco Packet Tracer',
    module: 'Networking',
    description: 'Explored the fundamentals of computer networking, including networking concepts, internetworking, the OSI and TCP/IP models, IPv4 and IPv6 addressing, subnetting, and network communication. Gained hands-on experience using Cisco Packet Tracer by establishing wired connections between devices using Copper Cross-Over cables, configuring network settings, and verifying communication through successful connectivity tests. Also learned about different network cable types and their practical applications while brainstorming innovative IoT-based project ideas for the MSME Hackathon 6.0.',

    summary: [
      'Studied OSI and TCP/IP models, IPv4/IPv6 addressing, and subnetting.',
      'Established wired LAN connections and verified connectivity in Packet Tracer.',
    ],
    bullets: [
      'Studied OSI and TCP/IP models, IPv4/IPv6 addressing, and subnetting',
      'Established wired LAN connections in Cisco Packet Tracer',
      'Configured network settings and verified connectivity with ping tests',
      'Learned about cable types: straight-through, crossover, and their uses',
      'Brainstormed IoT-based project ideas for MSME Hackathon 6.0',
    ],
  },
  '2026-07-07': {
    title: 'Day 16: DHCP Configuration & LAN Simulation in Cisco Packet Tracer',
    module: 'Networking',
    description: 'Configured a Local Area Network (LAN) using Cisco Packet Tracer by connecting servers, switches, hubs, and multiple end devices. Implemented Dynamic Host Configuration Protocol (DHCP) to automatically assign IP addresses while configuring the server with a static IP address. Performed network connectivity verification through successful ping tests between multiple devices. This practical session strengthened understanding of IP addressing, subnet masks, DHCP configuration, and LAN communication.',

    summary: [
      'Built a LAN topology with servers, switches, hubs, and end devices.',
      'Configured DHCP for auto IP assignment and verified ping connectivity.',
    ],
    bullets: [
      'Built a LAN topology with servers, switches, hubs, and end devices',
      'Configured a DHCP server to auto-assign IP addresses to clients',
      'Set a static IP on the server and verified DHCP pool ranges',
      'Verified inter-device connectivity through successful ping tests',
      'Reinforced understanding of IP addressing and subnet masks',
    ],
  },
  '2026-07-08': {
    title: 'Day 17: Router Configuration & Inter-Network Communication',
    module: 'Networking',
    description: "Reviewed the previous day's DHCP-based LAN implementation and advanced to router configuration using Cisco Packet Tracer. Explored FastEthernet and GigabitEthernet interfaces, configured routers for inter-network communication, and implemented both static and dynamic IP addressing. Designed a multi-router topology consisting of routers, switches, hubs, and end devices to establish communication between different networks. Successfully verified routing and connectivity across multiple subnets, improving practical knowledge of routing concepts and network design.",
    summary: [
      'Configured router interfaces: FastEthernet and GigabitEthernet.',
      'Designed a multi-router topology for inter-network communication.',
    ],
    bullets: [
      'Configured router interfaces: FastEthernet and GigabitEthernet',
      'Implemented static and dynamic IP addressing on router sub-interfaces',
      'Designed a multi-router topology connecting different network segments',
      'Verified inter-network routing and connectivity across subnets',
      'Applied static routing protocols to direct traffic between networks',
    ],
  },
  '2026-07-09': {
    title: 'Day 18: IoT Network Integration using Cisco Packet Tracer',
    module: 'Networking',
    description: 'Focused on integrating IoT devices using Cisco Packet Tracer by configuring routers with static routing to establish communication between multiple LANs. Connected remote computers to an IoT server and verified successful communication through ping tests. Identified and resolved routing and default gateway issues while validating remote monitoring and control of IoT devices using the IoT Monitor interface. This session strengthened practical skills in IoT networking and device connectivity.',

    summary: [
      'Configured static routing to connect multiple LANs with IoT devices.',
      'Resolved routing and gateway issues; validated IoT Monitor interface.',
    ],
    bullets: [
      'Configured static routing to connect multiple LANs with IoT devices',
      'Connected remote computers to an IoT server for data access',
      'Resolved routing and default gateway configuration issues',
      'Validated remote monitoring via the IoT Monitor interface',
      'Verified end-to-end connectivity through ping tests between devices',
    ],
  },
  '2026-07-10': {
    title: 'Day 19: MSME Hackathon 6.0 Idea Submission',
    module: 'Hackathon',
    description: 'Dedicated the day to researching innovative and cost-effective solutions for MSME Hackathon 6.0. Explored various problem statements, conducted prior-art and patent searches using the WIPO PatentScope database, and evaluated existing technologies. Finalized the project concept "Automated Coconut Grading System using Computer Vision." The activity enhanced understanding of innovation, intellectual property research, and practical problem-solving for industrial applications.',

    summary: [
      'Researched cost-effective solutions for MSME Hackathon 6.0.',
      'Finalized concept: Automated Coconut Grading System using Computer Vision.',
    ],
    bullets: [
      'Researched cost-effective solutions for MSME Hackathon 6.0 problem statements',
      'Conducted prior-art and patent searches using WIPO PatentScope',
      'Evaluated existing technologies and identified innovation opportunities',
      'Finalized the concept: Automated Coconut Grading System using Computer Vision',
      'Applied IP research and problem-solving techniques for industrial applications',
    ],
  },
  '2026-07-13': {
    title: 'Day 20: Cloud Computing & Go Services',
    module: 'Cloud Computing',
    description: 'Learned the fundamentals of Cloud Computing, including cloud service models such as Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS) along with their practical applications. Created and activated an AWS Cloud account with learning credits for hands-on practice. Installed and configured the Go (Golang) programming language and developed multiple Go-based web services, including Hello World, Calculator, Greeting API, Square Number Generator, Temperature Converter, and Weather Prediction services. Successfully tested the applications locally using localhost, gaining practical exposure to Go web development and cloud computing concepts.',

    summary: [
      'Studied IaaS, PaaS, and SaaS cloud service models.',
      'Developed Go web services: Hello World, Calculator, Greeting API, and more.',
    ],
    bullets: [
      'Studied IaaS, PaaS, and SaaS cloud service models and their applications',
      'Created and activated an AWS Cloud account with learning credits',
      'Installed Go and developed web services: Hello World, Calculator, Greeting API',
      'Built Square Number Generator, Temperature Converter, and Weather Prediction APIs',
      'Tested all Go services locally using localhost for end-to-end validation',
    ],
  },
  '2026-07-14': {
    title: 'Day 21: Docker & Virtualization',
    module: 'Cloud Computing',
    description: 'Learned the fundamentals of Docker and virtualization, including Docker Images, Containers, Dockerfiles, Docker Hub, and essential Docker commands. Studied the differences between traditional Virtual Machines and container-based virtualization. Created accounts for VMware and Tinkercad to support practical learning and simulation-based exercises. Gained a clear understanding of containerization, virtualization technologies, and their importance in modern cloud application deployment.',

    summary: [
      'Learned Docker fundamentals: images, containers, Dockerfiles, and Docker Hub.',
      'Compared container virtualization with traditional virtual machines.',
    ],
    bullets: [
      'Learned Docker fundamentals: images, containers, Dockerfiles, and Docker Hub',
      'Practised essential Docker commands: build, run, push, and inspect',
      'Compared container-based virtualization with traditional virtual machines',
      'Created VMware and Tinkercad accounts for hands-on simulation exercises',
      'Understood containerization workflows for cloud application deployment',
    ],
  },
  '2026-07-15': {
    title: 'Absent',
    module: '',
    status: 'absent',
    description: 'No internship activities were conducted on this day due to absence.',
    summary: [
      'No internship activities conducted due to absence.',
      'No sensor interfacing, circuit work, or cloud tasks performed.',
    ],
    bullets: [
      'No internship activities conducted due to absence',
      'No sensor interfacing or circuit work performed',
      'No cloud or networking tasks completed',
    ],
  },
  '2026-07-16': {
    title: 'Day 23: AWS EC2, Docker Deployment & Industry Institution Interactive Meet (IIIM)',
    module: 'Cloud Computing',
    description: 'Focused on cloud deployment and containerization by creating an Amazon EC2 Ubuntu Free Tier instance on AWS and configuring Docker for application deployment. Built Docker images and prepared previously developed Go web services for deployment using custom Dockerfiles. In the afternoon, attended the Industry Institution Interactive Meet (IIIM) organized by IIIT Kottayam in collaboration with the Board of Apprenticeship Training (BOAT), Chennai, under the Ministry of Education, Government of India. The session provided valuable insights into the National Apprenticeship Training Scheme (NATS 2.0), industry expectations, employability skills, and opportunities for industry-academia collaboration.',

    summary: [
      'Launched an AWS EC2 Ubuntu Free Tier instance for cloud deployment.',
      'Built Docker images and deployed Go web services on the EC2 instance.',
    ],
    bullets: [
      'Launched an AWS EC2 Ubuntu Free Tier instance for cloud deployment',
      'Configured Docker on the EC2 instance for application deployment',
      'Built Docker images and deployed Go web services using custom Dockerfiles',
      'Attended the Industry Institution Interactive Meet (IIIM) by IIIT Kottayam and BOAT',
      'Gained insights into NATS 2.0, employability skills, and industry-academia collaboration',
    ],
  },
  '2026-07-17': {
    title: 'Day 24: IoT Fundamentals, MQTT & Tinkercad Circuit Simulations',
    module: 'IoT Projects',
    description: 'Continued learning IoT and Cloud Computing fundamentals with an introduction to the MQTT (Message Queuing Telemetry Transport) protocol and its role in lightweight communication between IoT devices. Performed hands-on circuit simulations in Tinkercad, including LED blinking using Arduino Uno, Temperature Sensor interfacing, and PIR Motion Sensor implementation. These activities strengthened understanding of Arduino programming, sensor interfacing, and virtual circuit simulation for IoT applications.',

    summary: [
      'Studied MQTT protocol for lightweight IoT device communication.',
      'Simulated LED, temperature sensor, and PIR motion circuits in Tinkercad.',
    ],
    bullets: [
      'Studied MQTT protocol for lightweight IoT device-to-device communication',
      'Simulated LED blinking circuits using Arduino Uno in Tinkercad',
      'Interfaced a temperature sensor and verified readings in simulation',
      'Implemented a PIR motion sensor circuit with output detection',
      'Strengthened Arduino programming and virtual circuit design skills',
    ],
  },
  '2026-07-18': {
    title: 'Day 25: Docker Services Development and Practical Task Completion',
    module: 'Cloud Computing',
    description: 'Successfully completed Docker-based service development and additional practical assignments. Built, tested, and executed multiple containerized applications while practicing Docker image creation, container management, and deployment techniques. Improved troubleshooting, debugging, and practical software deployment skills through hands-on exercises.',

    summary: [
      'Built and tested multiple containerized Go web services with Docker.',
      'Practised Docker image creation, container management, and deployment.',
    ],
    bullets: [
      'Built and tested multiple containerized Go web services with Docker',
      'Practised Docker image creation, tagging, and container lifecycle management',
      'Executed containers locally and verified service endpoints',
      'Troubleshot image build errors and port-mapping issues',
      'Refined practical deployment and debugging skills through exercises',
    ],
  },
  '2026-07-20': {
    title: 'Day 26: Tinkercad IoT Circuit Design – Sensors and Actuators',
    module: 'IoT Projects',
    description: 'Designed and simulated 10 sensor-based and 10 actuator-based Arduino circuits using Tinkercad and Arduino Uno. Interfaced a variety of IoT sensors and actuators, implemented Arduino programs, and verified outputs through simulation. The activities strengthened practical knowledge of circuit design, sensor integration, actuator control, Arduino programming, and IoT application development while improving overall hardware interfacing skills.',

    summary: [
      'Designed and simulated 10 sensor-based Arduino circuits in Tinkercad.',
      'Designed and simulated 10 actuator-based Arduino circuits in Tinkercad.',
    ],
    bullets: [
      'Designed and simulated 10 sensor-based Arduino circuits in Tinkercad',
      'Designed and simulated 10 actuator-based Arduino circuits in Tinkercad',
      'Interfaced diverse IoT sensors and actuators with Arduino Uno',
      'Implemented and uploaded Arduino programs to verify circuit outputs',
      'Strengthened hardware interfacing, circuit design, and programming skills',
    ],
  },
};

const MODULE_LABELS = {
  'Electronics': 'Electronics',
  'Networking': 'Networking',
  'Arduino Programming': 'Arduino Programming',
  'IoT Projects': 'Hands-on IoT Projects',
  'Research': 'Research & Literature Survey',
  'Hackathon': 'MSME Hackathon 6.0',
  'Cloud Computing': 'Cloud Computing',
};
