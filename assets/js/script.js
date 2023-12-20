$(function () {
  // Display current date and time in the header
  function displayDateAndTime() {
    var currentDateAndTime = dayjs().format("dddd | MMMM D, YYYY | h:mm:ss A");
    $("#currentDay").text(currentDateAndTime);
  }

  // Initial update and refresh every second
  displayDateAndTime();
  setInterval(displayDateAndTime, 1000);

  // Get current hour in 24-hour format
  var currentHour = dayjs().hour();

  // Function to generate time blocks
  function generateTimeBlocks() {
    var container = $("#timeBlocksContainer");
    container.empty();

    // Loop through hours from 9 to 17
    for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = $('<div class="row time-block">');
      timeBlock.attr("id", "hour-" + hour);

      // Create hour column
      var hourColumn = $('<div class="col-2 col-md-1 hour text-center py-3">');
      var formattedHour = dayjs().hour(hour).format("hA");
      hourColumn.text(formattedHour);

      // Create description textarea
      var descriptionColumn = $('<textarea class="col-8 col-md-10 description" rows="3"> </textarea>');

      // Create save button
      var saveButton = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save">');
      saveButton.html('<i class="fas fa-save" aria-hidden="true"></i>');

      // Append components to the time block
      timeBlock.append(hourColumn, descriptionColumn, saveButton);
      container.append(timeBlock);

      // Apply past, present, or future class based on the current hour
      if (hour < currentHour) {
        timeBlock.addClass("past");
      } else if (hour === currentHour) {
        timeBlock.addClass("present");
      } else {
        timeBlock.addClass("future");
      }
    }
  }

  // Generate time blocks on page load
  generateTimeBlocks();

  // Add listener for click events on the save button
  $(".saveBtn").on("click", function () {
    // Get the id of the corresponding time block
    var blockId = $(this).parent().attr("id");

    // Get the user input from the textarea
    var userInput = $(this).siblings(".description").val();

    // Save the user input in local storage using the time block id as a key
    localStorage.setItem(blockId, userInput);
  });

  // Get and set values for textarea elements from local storage
  $(".time-block").each(function () {
    var blockId = $(this).attr("id");
    var storedInput = localStorage.getItem(blockId);

    if (storedInput) {
      $(this).find(".description").val(storedInput);
    }
  });
});
