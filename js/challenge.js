document.addEventListener("DOMContentLoaded", () => {
  //
  // counter shenanigans
  //
  // was able to get counter to pause, and unpause. but cannot pause again.
  // i believe this is because the timer i set when i restart is different from the
  // one that gets cleared when "pause" is clicked.
  // i tried to remedy this by restarting the timer using the same function.
  //  When using same timer the timer never started, unsure why
  //-----------------------------------------------------------

  //https://stackoverflow.com/questions/63312866/how-to-start-and-stop-counter-by-single-button
  // used var in same manner as shown in this solution to add start and pause functionality
  // was unable to find a way to both pause, start, and pause again without var
  // i could get it to pause but not restart, or restart but not pause again
  //------------------------------------------------------------------------
  var myTimer;
  function myCounter() {
    myTimer = setInterval(() => {
      let counter = parseInt(document.getElementById("counter").textContent);
      counter += 1;
      document.getElementById("counter").textContent = counter;
    }, 1000);
  }

  function startCount() {
    myCounter();
  }

  function stopCounter() {
    clearInterval(myTimer);
  }
  // function that is called when we click on pause
  //----------------------------------------------
  function stopCount(e) {
    let ourId = e.target.id;
    if (ourId === "pause") {
      stopCounter();
      document.getElementById("pause").textContent = "resume";
      document.getElementById("pause").id = "resume";
      document.getElementById("minus").setAttribute("disabled", "disabled");
      document.getElementById("plus").setAttribute("disabled", "disabled");
      document.getElementById("heart").setAttribute("disabled", "disabled");
    } else if (ourId === "resume") {
      startCount();
      document.getElementById("resume").textContent = "pause";
      document.getElementById("resume").id = "pause";
      document.getElementById("minus").removeAttribute("disabled");
      document.getElementById("plus").removeAttribute("disabled");
      document.getElementById("heart").removeAttribute("disabled");
    }
  }
  // hooked up buttons
  //------------------
  document.getElementById("pause").addEventListener("click", stopCount);

  document.getElementById("minus").addEventListener("click", (e) => {
    let currentCount = parseInt(document.getElementById("counter").textContent);
    currentCount--;
    document.getElementById("counter").textContent = currentCount;
  });
  document.getElementById("plus").addEventListener("click", (e) => {
    let currentCount = parseInt(document.getElementById("counter").textContent);
    currentCount++;
    document.getElementById("counter").textContent = currentCount;
  });
  document.getElementById("heart").addEventListener("click", updateLike);
  //start counter
  //-------------
  startCount();
});
// updates likes and appends to dom
//---------------------------------
function updateLike(e) {
  const likeBar = document.querySelector(".likes");
  const ourNum = parseInt(document.getElementById("counter").textContent);
  let renderedP = document.getElementById(
    `${parseInt(document.getElementById("counter").textContent)}`
  );
  if (!!renderedP) {
    let count = renderedP.textContent.split(" ")[4];
    count++;
    renderedP.textContent = `${ourNum} has been liked ${count} times`;
  } else {
    let p = document.createElement("p");
    p.textContent = `${ourNum} has been liked 1 time`;
    p.setAttribute("id", `${ourNum}`);
    likeBar.append(p);
  }
}

//form hookup
//------------
let form = document.getElementById("comment-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  let newComment = document.createElement("p");
  newComment.textContent = `${formData.comment}`;
  document.getElementById("list").append(newComment);
});
