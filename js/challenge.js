document.addEventListener("DOMContentLoaded", () => {
  //------------------------//
  // counter shenanigans
  //------------------------//
  const startCount = setInterval(() => {
    let counter = parseInt(document.getElementById("counter").textContent);
    counter += 1;
    document.getElementById("counter").textContent = counter;
  }, 1000);

  function updateCount() {
    startCount;
  }

  function stopCounter() {
    clearInterval(startCount);
  }
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
      const startCount = setInterval(() => {
        let counter = parseInt(document.getElementById("counter").textContent);
        counter += 1;
        document.getElementById("counter").textContent = counter;
      }, 1000);
      function updateCount() {
        startCount;
      }
      document.getElementById("resume").textContent = "pause";
      document.getElementById("resume").id = "pause";
      document.getElementById("minus").removeAttribute("disabled");
      document.getElementById("plus").removeAttribute("disabled");
      document.getElementById("heart").removeAttribute("disabled");
      updateCount();
    }
  }
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
  updateCount();
});

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
    console.log("hello");
    let p = document.createElement("p");
    p.textContent = `${ourNum} has been liked 1 time`;
    p.setAttribute("id", `${ourNum}`);
    likeBar.append(p);
  }
}

//form hookup
let form = document.getElementById("comment-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  let newComment = document.createElement("p");
  newComment.textContent = `${formData.comment}`;
  document.getElementById("list").append(newComment);
});
