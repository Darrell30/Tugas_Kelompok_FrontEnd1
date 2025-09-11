document.addEventListener('DOMContentLoaded', () => {

  // 1. DATA: Store all timeline information in an array of objects
  const timelineData = [
    {
      year: "1952",
      title: "The Beginning: Trackball",
      description: "Invented by Ralph Benjamin for the Royal Canadian Navy, this device used a rolling ball to control a cursor. Though not patented as a computer input device, it was a foundational concept for modern pointing devices.",
      image: "img/trackball.png"
    },
    {
      year: "1964",
      title: "The First Mouse Prototype",
      description: "Douglas Engelbart at the Stanford Research Institute created the first-ever computer mouse. It was made of wood and had two perpendicular wheels that translated motion onto the screen.",
      image: "img/1964.JPG"
    },
    {
      year: "1968",
      title: "The 'Rollkugel' Trackball Mouse",
      description: "The German company Telefunken released the 'Rollkugel' (rolling ball). This device, which inverted the trackball concept by placing the ball on the bottom, is considered the first commercial trackball mouse.",
      image: "img/rollkugel.JPG"
    },
    {
      year: "1980",
      title: "The First Optical Mouse",
      description: "Independently developed by Steve Kirsch and Richard F. Lyon, the first optical mice used LEDs and sensors to detect movement on special patterned mousepads, eliminating mechanical rollers.",
      image: "img/Steve1980.jpg"
    },
    {
      year: "1981",
      title: "First Commercial Mouse: Xerox Star",
      description: "The Xerox Star 8010 workstation was the first commercial system to be sold with a mouse as a standard component, introducing the world to graphical user interfaces.",
      image: "img/1981.jpg"
    },
    {
      year: "1983",
      title: "The Consumer Mouse: Apple Lisa",
      description: "Apple launched the Lisa computer with a redesigned, single-button mouse that was more affordable and reliable, making the technology accessible to a wider consumer market.",
      image: "img/1983.jpg"
    },
    {
      year: "1991",
      title: "The First RF Wireless Mouse",
      description: "Building on earlier infrared models, Logitech's Cordless MouseMan was the first to use radio frequency (RF) signals, allowing it to work without a direct line of sight to the receiver.",
      image: "img/1991.jpg"
    },
    {
      year: "1994",
      title: "The First Ergonomic Mouse",
      description: "The Evoluent VerticalMouse, invented by Jack Lo, was designed to be held in a 'handshake' position. This innovation aimed to reduce forearm twisting and wrist strain for better comfort.",
      image: "img/1994.jpg"
    },
    {
      year: "1999",
      title: "The First Gaming Mouse: Razer Boomslang",
      description: "Razer introduced the Boomslang, the first mouse designed specifically for gamers. It featured high-precision sensors (up to 2000 DPI), on-the-fly sensitivity adjustment, and an ergonomic design.",
      image: "img/1999.png"
    },
    {
      year: "2004",
      title: "The First Laser Mouse",
      description: "Logitech, in partnership with Agilent, released the MX1000, the world's first mouse to use a laser for tracking. This offered 20 times more surface sensitivity than optical mice.",
      image: "img/2004.jpg"
    },
    {
      year: "2007",
      title: "The Gyroscopic 'Air' Mouse",
      description: "Logitech's MX Air could be used like a normal mouse on a desk but could also be picked up and controlled in the air, using gyroscopes to track motion for presentations or media centers.",
      image: "img/2007.jpg"
    },
    {
      year: "2014",
      title: "The Multi-Surface 'Darkfield' Mouse",
      description: "The Logitech MX Master introduced advanced Darkfield Laser Tracking, allowing it to work flawlessly on virtually any surface, including glass and high-gloss tables.",
      image: "img/2014.png"
    }
  ];

  // 2. DOM ELEMENTS: Get references to the HTML elements we need to manipulate
  const timelineBar = document.getElementById('timeline-bar');
  const timelineImage = document.getElementById('timeline-image');
  const timelineTitle = document.getElementById('timeline-title');
  const timelineDescription = document.getElementById('timeline-description');
  const textContent = document.querySelector('.text-content');

  // 3. CREATE TIMELINE MARKERS: Dynamically generate the year markers on the bar
  timelineData.forEach((item, index) => {
    const marker = document.createElement('div');
    marker.classList.add('timeline-marker');
    marker.dataset.index = index; // Store the index in a data attribute
    marker.innerHTML = `
      <div class="year">${item.year}</div>
      <div class="dot"></div>
    `;
    
    // Add a click event listener to each marker
    marker.addEventListener('click', () => {
      updateDisplay(index);
    });

    timelineBar.appendChild(marker);
  });

  // 4. UPDATE DISPLAY FUNCTION: The core logic to change content
  function updateDisplay(index) {
    const item = timelineData[index];

    // Add a fade-out effect
    timelineImage.classList.add('fade');
    textContent.classList.add('fade');

    // Use a short timeout to allow the fade-out effect to be visible
    setTimeout(() => {
      // Update the content
      timelineImage.src = item.image;
      timelineImage.alt = `Image of ${item.title}`;
      timelineTitle.textContent = item.title;
      timelineDescription.textContent = item.description;

      // Add a fade-in effect
      timelineImage.classList.remove('fade');
      textContent.classList.remove('fade');
    }, 200); // 200ms matches half of the CSS transition duration
    
    // Update the 'active' class on the timeline markers
    const allMarkers = document.querySelectorAll('.timeline-marker');
    allMarkers.forEach(m => m.classList.remove('active'));
    allMarkers[index].classList.add('active');

    // Optional: Center the active marker in the scrollable view
    const activeMarker = allMarkers[index];
    activeMarker.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  // 5. INITIALIZE: Show the first item when the page loads
  updateDisplay(0);

});