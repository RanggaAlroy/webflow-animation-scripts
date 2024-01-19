const contentItems = document.querySelectorAll(".content-item");
const hoverTrigger = document.querySelectorAll(".hover-trigger");
const brandName = document.querySelectorAll(".brand-name");
const workServices = document.querySelectorAll(".work-services");
const contentHover = document.querySelector(".content-hover-wrapper"); // Added dot for class selector
const contentImages = document.querySelectorAll(".hover-content-item");

hoverTrigger.forEach((item, index) => {
  item.addEventListener("mouseover", () => {
    contentHover.style.display = "flex";
    contentImages[index].style.display = "block";
    brandName.forEach((brandItem, brandIndex) => {
      if (brandIndex === index) {
        brandItem.children[0].style.width = "19px";
        brandItem.children[1].style.fontStyle = "italic";
        brandItem.children[1].style.color = "#122280";
      } else {
        brandItem.children[1].style.color = "rgba(13, 26, 96, 0.25)";
      }
    });

    workServices.forEach((workItem, workIndex) => {
      if (workIndex === index) {
        Array.from(workItem.children).forEach((child) => {
          child.style.fontStyle = "italic";
          child.style.color = "#122280";
        });
      } else {
        Array.from(workItem.children).forEach((child) => {
          child.style.color = "rgba(13, 26, 96, 0.25)";
        });
      }
    });

    contentItems.forEach((border, borderIndex) => {
      if (borderIndex !== index) {
        border.style.borderTop = "1px solid rgba(13, 26, 96, 0.25)";
      }
    });
  });

  item.addEventListener("mouseout", () => {
    contentHover.style.display = "none";
    contentImages[index].style.display = "none";
    brandName[index].children[0].style.width = "0px";
    brandName[index].children[1].style.fontStyle = "normal";

    workServices.forEach((workItem) => {
      Array.from(workItem.children).forEach((child) => {
        child.style.fontStyle = "normal";
        child.style.color = "#162BA0";
      });
    });
    brandName.forEach((brandItem) => {
      brandItem.children[1].style.color = "#162BA0";
    });
    contentItems.forEach((border) => {
      border.style.borderTop = "1px solid #162BA0";
    });
  });
});
