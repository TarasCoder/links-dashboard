$(document).ready(function () {
  const copyIco = "./img/copy.png";
  const delIco = "./img/del.png";
  const modal = $(".app_modal");
  const input_desc = document.getElementById("input_desc");
  const input_link = document.getElementById("input_link");
  const save_btn = document.getElementById("save_btn");
  const generation_of_blocks = document.getElementById("generation_of_blocks");
  input_link.value = "http://";

  let infoArr = JSON.parse(localStorage.getItem("links")) || [];
  rerender(infoArr);

  save_btn.addEventListener("click", (ev) => {
    ev.preventDefault();
    if (
      input_desc.value !== "" &&
      input_link.value !== "" &&
      input_link.value !== "http://"
    ) {
      let newObj = {
        desc: input_desc.value,
        link: input_link.value,
      };
      infoArr.push(newObj);
      localStorage.setItem("links", JSON.stringify(infoArr));
      input_desc.value = "";
      input_link.value = "http://";
      input_desc.focus();
      rerender(infoArr);
    } else {
      alert("Fill in the input fields!");
    }
  });

  function addListeners() {
    const all_copy_icons = document.querySelectorAll(".ico_copy");
    const all_del_icons = document.querySelectorAll(".ico_del");
    const all_titles = document.querySelectorAll(".block_title");
    const all_links = document.querySelectorAll(".block_link");
    all_copy_icons.forEach((item, index) => {
      item.addEventListener("click", () => {
        navigator.clipboard.writeText(
          all_titles[index].innerText + " " + all_links[index].href
        );
        $(modal).css("display", "flex");
        setTimeout(() => {
          $(modal).css("display", "none");
        }, 700);
      });
    });
    all_del_icons.forEach((item, index) => {
      item.addEventListener("click", () => {
        infoArr.splice(index, 1);
        localStorage.setItem("links", JSON.stringify(infoArr));
        rerender(infoArr);
      });
    });
  }

  function createEl(desc, link) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const a = document.createElement("a");
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");
    // div.innerHTML = svg;
    div.classList.add("block");
    p.classList.add("block_title");
    a.classList.add("block_link");
    img1.setAttribute("src", copyIco);
    img2.setAttribute("src", delIco);
    img1.classList.add("block_ico");
    img1.classList.add("ico_copy");
    img2.classList.add("block_ico");
    img2.classList.add("ico_del");
    p.textContent = desc;
    a.textContent = link;
    a.setAttribute("href", link);
    a.setAttribute("target", "_blank");
    div.append(p, a, img1, img2);
    generation_of_blocks.append(div);
  }

  function rerender(arr) {
    generation_of_blocks.innerHTML = "";
    arr.forEach((item) => {
      createEl(item.desc, item.link);
    });
    addListeners();
  }
});
