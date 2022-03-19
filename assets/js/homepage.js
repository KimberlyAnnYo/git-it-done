var repoContainerEl = document.querySelector("#repo-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function (user) {
  //format tge guthub api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  //make a request to the url
  fetch(apiUrl)
    .then(function (response) {
        //request was sucessful
        if (response.ok) {
      return response.json().then(function (data) {
      displayRepos(data, user);
    });
}else{
    alert("Error: GitHub User Not Found")
}
})
.catch(function(error){
    //notice this `.catch getting chained into the end of the `.then()` method
    alert("Unable to connect to GitHub");
})
};

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function (event) {
  event.preventDefault();
  //get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
  console.log(event);
};

userFormEl.addEventListener("submit", formSubmitHandler);

var displayRepos = function (data) {
    // Check if api returned any repos
    if (data.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
  console.log(data);
  repoContainerEl.textContent = "";
  //repoSearchTerm.textContent = searchTerm;
  // loop over repos
  for (var i = 0; i < data.length; i++) {
    // format repo name
    var repoName = data[i].owner.login + "/" + data[i].name;

    // create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (data[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times statis-icon icon-danger'></i>" +
        data[i].open_issues_count +
        " issue(s)";
    } else {
      statusEl.innerHTML =
        "<i class = 'fas fa-check-square status-icon icon-success'></i>";
    }
    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};
