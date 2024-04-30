// Define the CSS rules within a JavaScript template literal
var cssCode = `
  /* Style for the generated itinerary */
  changing file
  /* Itinerary container */
  .itinerary {
    margin-top: 20px;
  }

  /* Individual itinerary item */
  .itinerary-item {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  /* Paragraphs within itinerary item */
  .itinerary-item p {
    margin: 0;
    line-height: 1.5;
  }

  /* Heading styles */
  h2 {
    color: #333;
  }

  h3 {
    color: #555;
    margin-bottom: 10px;
  }

  /* Date label */
  .date {
    font-weight: bold;
    color: #007bff;
  }

  /* Activity styles */
  .activity {
    margin-left: 20px;
  }

  /* Activity heading */
  .activity-heading {
    font-weight: bold;
    color: #007bff;
  }

  /* Activity description */
  .activity-description {
    margin-left: 20px;
  }

  /* Budget information */
  .budget-info {
    margin-top: 20px;
    font-size: 16px;
    color: #555;
  }

  /* Strong emphasis in budget info */
  .budget-info strong {
    color: #333;
  }

  /* Button container */
  .button-container {
    margin-top: 20px;
  }
`;

// Create a <style> element
var styleElement = document.createElement('style');
styleElement.type = 'text/css';

// Append the CSS rules to the <style> element
if (styleElement.styleSheet) {
  // For IE
  styleElement.styleSheet.cssText = cssCode;
} else {
  // For other browsers
  styleElement.appendChild(document.createTextNode(cssCode));
}

// Append the <style> element to the <head> of the document
document.head.appendChild(styleElement);







function generateItinerary() {
  // Get input values
  var dest = document.getElementById("dest").value.toLowerCase(); // Convert destination to lowercase for case-insensitive comparison
  var people = parseInt(document.getElementById("people").value);
  var days = parseInt(document.getElementById("days").value);
  var budget = parseInt(document.getElementById("budget").value);

  // Validate input values
  if (dest.trim() === "") {
      alert("Please enter destination.");
      return;
  }
  if (isNaN(people) || isNaN(days) || isNaN(budget) || people < 1 || days < 1 || budget < 1) {
      alert("Please enter valid numbers for people, days, and budget.");
      return;
  }

  // Define itineraries for different destinations
  var itineraries = {
    "rajasthan": [
      "Day 1: Jipur - Pink City Tour: Begin your journey in Jaipur, the Pink City. Visit the iconic Hawa Mahal, explore the majestic City Palace, and admire the astronomical instruments at Jantar Mantar.",
      "Day 2: Jodhpur - Mehrangarh Fort and Blue City: Head to Jodhpur, known as the Blue City. Explore the imposing Mehrangarh Fort, stroll through the vibrant streets of the old town, and visit the intricately carved Jaswant Thada.",
      "Day 3: Udaipur - City of Lakes: Travel to Udaipur, the City of Lakes. Take a boat ride on Lake Pichola, visit the opulent City Palace, and explore the serene Saheliyon ki Bari gardens.",
      "Day 4: Jaisalmer - Golden City Exploration: Explore the golden city of Jaisalmer. Discover the magnificent Jaisalmer Fort, visit the intricately carved Patwon ki Haveli, and experience the sand dunes of the Thar Desert.",
      "Day 5: Pushkar - Sacred City Tour: Visit the holy town of Pushkar. Explore the Brahma Temple, take a dip in the sacred Pushkar Lake, and wander through the bustling streets filled with vibrant markets and ghats.",
      // Add more activities for Rajasthan itinerary as needed
  ],
    "kashmir": [
        "Day 1: Srinagar Arrival - Dal Lake and Shikara Ride: Begin your Kashmir journey with a visit to Dal Lake, known for its serene beauty and houseboats. Enjoy a peaceful Shikara ride amidst the breathtaking scenery of the lake, surrounded by snow-capped mountains.",
        "Day 2: Srinagar Sightseeing - Mughal Gardens and Shankaracharya Temple: Explore the enchanting Mughal Gardens including Nishat Bagh, Shalimar Bagh, and Chashme Shahi. Later, visit the Shankaracharya Temple located atop a hill, offering panoramic views of the city.",
        "Day 3: Excursion to Gulmarg - Gondola Ride and Winter Sports: Take a day trip to Gulmarg, a paradise for nature lovers and adventure enthusiasts. Experience the exhilarating Gondola ride, offering mesmerizing views of the snow-covered peaks. Enjoy activities like skiing, snowboarding, and snow trekking in the winter wonderland.",
        "Day 4: Pahalgam Exploration - Betaab Valley and Aru Valley: Visit the picturesque town of Pahalgam, surrounded by lush greenery and glistening rivers. Explore the scenic Betaab Valley, named after the Bollywood movie 'Betaab', and the tranquil Aru Valley, known for its natural beauty and adventure trails.",
        "Day 5: Sonamarg Excursion - Thajiwas Glacier and Ganderbal: Embark on a day trip to Sonamarg, also known as the 'Meadow of Gold', nestled amidst majestic Himalayan peaks. Trek to the stunning Thajiwas Glacier and enjoy the pristine beauty of Ganderbal district.",
        // Add more activities for Kashmir itinerary as needed
    ],
    "uttarakhand": [
        "Day 1: Arrival in Dehradun - Robber's Cave and Sahastradhara: Start your Uttarakhand journey with a visit to Robber's Cave, a natural cave formation surrounded by lush greenery. Later, explore Sahastradhara, known for its therapeutic sulphur springs and stunning waterfalls.",
        "Day 2: Mussoorie Sightseeing - Kempty Falls and Mall Road: Visit the scenic hill station of Mussoorie and explore attractions like Kempty Falls, Gun Hill, and Camel's Back Road. Enjoy a leisurely stroll along the famous Mall Road, lined with shops and eateries.",
        "Day 3: Rishikesh Excursion - Laxman Jhula and Triveni Ghat: Take a day trip to Rishikesh, the 'Yoga Capital of the World'. Visit iconic landmarks such as Laxman Jhula, Ram Jhula, and Triveni Ghat. Experience the spiritual vibes and attend the mesmerizing Ganga Aarti ceremony in the evening.",
        "Day 4: Haridwar Visit - Har Ki Pauri and Chandi Devi Temple: Explore the sacred city of Haridwar, known for its religious significance. Take a holy dip in the Ganges at Har Ki Pauri and visit the ancient Chandi Devi Temple, located atop Neel Parvat hill.",
        "Day 5: Nainital Tour - Naini Lake and Naina Devi Temple: Discover the charming hill town of Nainital and enjoy a boat ride on the picturesque Naini Lake. Visit the sacred Naina Devi Temple and explore nearby attractions like Snow View Point and Tiffin Top.",
        // Add more activities for Uttarakhand itinerary as needed
    ],
    "uttar pradesh": [
      "Day 1: Agra Sightseeing - Taj Mahal and Agra Fort: Begin your journey in Agra, home to iconic landmarks. Visit the magnificent Taj Mahal, a UNESCO World Heritage Site, and explore the historic Agra Fort.",
      "Day 2: Varanasi Exploration - Ghats and Temples: Head to Varanasi, the spiritual capital of India. Witness the mesmerizing Ganga Aarti at Dashashwamedh Ghat, take a boat ride on the Ganges, and explore the ancient temples.",
      "Day 3: Lucknow Visit - Bara Imambara and Hazratganj: Explore the cultural city of Lucknow. Visit Bara Imambara, stroll through the bustling streets of Hazratganj, and savor the famous Lucknowi cuisine.",
      "Day 4: Allahabad Tour - Triveni Sangam and Anand Bhawan: Travel to Allahabad, a city of historical significance. Take a dip at the Triveni Sangam, the confluence of the Ganges, Yamuna, and Saraswati rivers, and visit the ancestral home of the Nehru family, Anand Bhawan.",
      "Day 5: Ayodhya Excursion - Ram Janmabhoomi and Hanuman Garhi: Visit Ayodhya, the birthplace of Lord Ram. Explore the Ram Janmabhoomi site, Hanuman Garhi temple, and other significant temples in the city.",
      // Add more activities for Uttar Pradesh itinerary as needed
  ],
  "kerala": [
    "Day 1: Cochin Exploration - Fort Kochi and Chinese Fishing Nets: Begin your journey in Cochin, a port city with a rich heritage. Explore the historic Fort Kochi area, visit the iconic Chinese Fishing Nets, and stroll along the picturesque waterfront.",
    "Day 2: Munnar Sightseeing - Tea Gardens and Mattupetty Dam: Head to Munnar, a hill station known for its lush tea estates. Visit the sprawling tea gardens, explore the scenic Mattupetty Dam, and enjoy breathtaking views of the Western Ghats.",
    "Day 3: Alleppey Houseboat Experience - Backwaters and Vembanad Lake: Embark on a houseboat cruise through the serene backwaters of Alleppey. Relax as you glide past palm-fringed landscapes, traditional villages, and lush paddy fields.",
    "Day 4: Thekkady Adventure - Periyar Wildlife Sanctuary and Spice Plantations: Explore Thekkady, home to the Periyar Wildlife Sanctuary. Take a boat safari on Periyar Lake, trek through the spice plantations, and spot diverse wildlife in their natural habitat.",
    "Day 5: Kovalam Beach Relaxation - Lighthouse Beach and Ayurvedic Massage: Relax on the golden sands of Kovalam Beach, known for its pristine beauty and tranquil atmosphere. Enjoy water sports, indulge in an Ayurvedic massage, and witness a mesmerizing sunset.",
    // Add more activities for Kerala itinerary as needed
],
"karnataka": [
  "Day 1: Bangalore City Tour - Lalbagh Botanical Garden and Vidhana Soudha: Begin your journey in Bangalore, the 'Garden City'. Explore the lush Lalbagh Botanical Garden, visit the iconic Vidhana Soudha, and admire the architectural marvels.",
  "Day 2: Mysore Excursion - Mysore Palace and Chamundi Hill: Head to Mysore, known for its royal heritage. Visit the magnificent Mysore Palace, explore the Chamundi Hill temple complex, and enjoy panoramic views of the city.",
  "Day 3: Coorg Nature Trail - Abbey Falls and Dubare Elephant Camp: Explore the enchanting landscapes of Coorg. Visit the picturesque Abbey Falls, experience the Dubare Elephant Camp, and indulge in activities like river rafting and nature walks.",
  "Day 4: Hampi Heritage Walk - Hampi Ruins and Virupaksha Temple: Discover the UNESCO World Heritage Site of Hampi. Explore the ancient ruins, visit the iconic Virupaksha Temple, and marvel at the architectural wonders of the Vijayanagara Empire.",
  "Day 5: Gokarna Beach Getaway - Om Beach and Mahabaleshwar Temple: Relax on the pristine beaches of Gokarna. Visit the scenic Om Beach, explore the famous Mahabaleshwar Temple, and enjoy water sports like surfing and snorkeling.",
  // Add more activities for Karnataka itinerary as needed
],
    // Add more destinations and their respective itineraries here
};

  // Check if the destination has a predefined itinerary
  if (itineraries.hasOwnProperty(dest)) {
      var itineraryHTML = "<h2>Generated Itinerary</h2>";
      itineraryHTML += "<p><strong>Destination:</strong> " + dest + "</p>";
      itineraryHTML += "<p><strong>No of People:</strong> " + people + "</p>";
      itineraryHTML += "<p><strong>Number of Days:</strong> " + days + "</p>";
      itineraryHTML += "<p><strong>Budget:</strong> RS." + budget + "</p>";
      itineraryHTML += "<h3>Itinerary Details:</h3>";

      var destinationItinerary = itineraries[dest];
      for (var i = 0; i < days; i++) {
          var activityIndex = i % destinationItinerary.length;
          var activity = destinationItinerary[activityIndex];

          itineraryHTML += "<div class='itinerary-item'>";
          itineraryHTML += "<p><strong>Day:</strong> " + (i + 1) + "</p>";
          itineraryHTML += "<p>" + activity + "</p>";
          itineraryHTML += "</div>";
      }

      // Display itinerary on the webpage
      document.getElementById("itinerary").innerHTML = itineraryHTML;
  } else {
      alert("No predefined itinerary found for the entered destination.");
  }
}
