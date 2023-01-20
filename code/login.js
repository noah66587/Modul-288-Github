const form = document.getElementById('login-form');
form.addEventListener('submit', event => {
  event.preventDefault(); // Prevent the form from refreshing the page

  // Get the file input element
  const fileInput = document.getElementById('game-state-file');

  // Check if a file was selected
  if (!fileInput.files[0]) {
    return;
  }

  // Read the file as text
  const fileReader = new FileReader();
  fileReader.onload = () => {
    // Parse the file contents as JSON
    const gameState = JSON.parse(fileReader.result);

    // Set the global gameState variable
    window.gameState = gameState;

    // Redirect to the main game page
    window.location.href = 'index.html';
  };
  fileReader.readAsText(fileInput.files[0]);
});
