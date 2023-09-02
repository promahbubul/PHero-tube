/************* Part-1 **************/
/**
 * 1. create a function  displayButtons and call this function
 * 2. fetch the button api
 */

const displayButtons = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const button = data.data;

  btnContainer(button);
};

const btnContainer = (button) => {
  const btnDiv = document.getElementById("btn-container");
  console.log(button);

  button.forEach((cat) => {
    const button = document.createElement("button");
    button.innerHTML = `
              <button id="${cat.category_id}" onclick="loadData(${cat.category_id})" class="btn ">${cat.category}</button>
          `;
    btnDiv.appendChild(button);
  });
};

// data load
const loadData = async (id) => {
  const clickedBtn = document.getElementById(id);
  // const btnAtt = clickedBtn.attributes(id);
  // console.log(btnAtt);
  // if (clickedBtn == id) {
  //   clickedBtn.classList.add("activeBtn");
  // }
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const videos = data.data;

  if (videos[0] === undefined) {
    noContentFind();
    console.log(videos[0] == undefined);
  } else {
    displayContent(videos);
  }
};

// dispaly video content
const displayContent = (videos) => {
  const videoContaner = document.getElementById("video-container");
  videoContaner.textContent = "";
  videoContaner.classList.add("grid");

  videos.forEach((video) => {
    const card = document.createElement("div");
    // console.log(video.others.posted_date !== "");
    card.innerHTML = `
            <div class="card rounded-none">
          <figure class="flex flex-col relative">
            <img class="h-52 w-full rounded-lg"
              src="${video.thumbnail}"
            />
            <span class="">${
              video.others.posted_date !== ""
                ? `<span class=" absolute py-1 px-2 bottom-3 right-3 rounded-md bg-[#171717] text-white">${videoTime(
                    video.others.posted_date
                  )}</span>`
                : ""
            } </span>
          </figure>
          <div class="card-body flex flex-row w-full p-0 mt-5">
            <div class="w-2/12">
              <img class='rounded-full w-10 h-10' src="${
                video.authors[0].profile_picture
              }" alt="" />
            </div>
            <div class="space-y-2">
              <div>
                <h2 class="text-lg font-semibold leading-8">
               ${video.title}
              </h2>
              <div class="flex gap-2">
                <span class="text-[#171717B2]">${
                  video.authors[0].profile_name
                }</span>
                ${
                  video.authors[0].verified == false
                    ? "<span></span>"
                    : `<img src="./verifyed.png"`
                }
              </div>
               
              </div>
              <div>
                <span class="text-[#171717B2]">${video.others.views}</span>
              </div>
            </div>
          </div>
        </div>
        `;
    // console.log(video);
    videoContaner.appendChild(card);
  });
};

// no content here
const noContentFind = () => {
  const videoContaner = document.getElementById("video-container");
  videoContaner.textContent = "";
  videoContaner.classList.remove("grid");

  const card = document.createElement("div");
  card.innerHTML = `
    <div class="mt-20">
    <img class="text-center mx-auto" src="./Icon.png" />
    <h3 class="font-bold text-center text-4xl">Oops!! Sorry, There is no<br> content here</h3>
    </div>
      `;
  videoContaner.appendChild(card);
  // console.log(card, videoContaner);
};

/**
 * 1. thumbnail = thumbnail
 * 2. title = title
 * 3. author = authors.profile_name
 * 4. views = others.views
 * 5. avator = authors.profile_picture
 * 6. blue icon = authors.verified
 */

displayButtons();
loadData((id = 1000));

const videoTime = (second) => {
  const seconds = second;

  const hours = Math.floor(seconds / 3600);
  const remainingSecondsAfterHours = seconds % 3600;
  const minutes = Math.floor(remainingSecondsAfterHours / 60);

  const time = `${hours} hrs ${minutes} min ago`;
  return time;
};

// view post by sort

const cardViewBySort = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/category/1000"
  );

  const data = await res.json();
  const views = data.data;
  const viewNumbers = [];
  views.forEach((view) => {
    const viewsList = view.others.views.slice(0, -1);
    viewNumbers.push(viewsList);
  });
  console.log(viewNumbers.sort((a, b) => a - b));
};
