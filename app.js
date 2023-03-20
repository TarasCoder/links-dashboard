$( document ).ready(function() {
    const modal= $(".app_modal");
    const all_titles = document.querySelectorAll(".block_title");
    const all_links = document.querySelectorAll(".block_link");
    const all_icons = document.querySelectorAll(".block_ico");
    all_icons.forEach((item, index)=>{
        item.addEventListener("click", ()=>{
            navigator.clipboard.writeText(all_titles[index].innerText + " " + all_links[index].href);
            $(modal).css("display", "flex");
            setTimeout(()=>{
                $(modal).css("display", "none");
            }, 700)
        })
    })
});
