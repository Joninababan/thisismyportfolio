document.addEventListener('DOMContentLoaded', () => {
   const modal = document.querySelectorAll('.modal');
   const cardBtn = document.querySelectorAll('.port-img');
   const modalClose = document.querySelectorAll('.modal__close');
   const modalCard = document.querySelectorAll('.modal__card');
   
   // Function to handle modal visibility
   const activeModal = (modalIndex) => {
     modal[modalIndex].classList.add('active-modal');
     const images = modal[modalIndex].querySelectorAll('.modal__img');
     
     // Ensure only the first image is active (visible)
     images.forEach((img, index) => {
       img.classList.remove('modal__img--active'); // Remove active class from all images
       img.style.zIndex = -1; // Set z-index to -1 for inactive images
     });
 
     // Make the first image active
     images[0].classList.add('modal__img--active');
     images[0].style.zIndex = 1; // Set the z-index of the first image to 1
     modal[modalIndex].activeIndex = 0; // Store the active image index
   };
 
   // Show modal on card click
   cardBtn.forEach((card, i) => {
     card.addEventListener('click', () => {
       activeModal(i); // Show the respective modal for clicked card
     });
   });
 
   // Close modal
   modalClose.forEach((close) => {
     close.addEventListener('click', () => {
       modal.forEach((m) => {
         m.classList.remove('active-modal');
       });
     });
   });
 
   // Close modal when clicking outside the modal content
   modal.forEach((m) => {
     m.addEventListener('click', () => {
       m.classList.remove('active-modal');
     });
   });
 
   // Prevent closing when clicking inside the modal content
   modalCard.forEach((card) => {
     card.addEventListener('click', (e) => {
       e.stopPropagation();
     });
   });
 
   // Function to change images in the modal slider for a specific modal
   const changeImage = (direction, modalIndex) => {
     const images = modal[modalIndex].querySelectorAll('.modal__img');
     let activeIndex = modal[modalIndex].activeIndex || 0; // Get the active index for the modal
 
     // Remove active class and reset z-index for all images
     images.forEach((img) => {
       img.classList.remove('modal__img--active');
       img.style.zIndex = -1; // Set z-index to -1 for all images
     });
 
     // Update the active index based on the direction
     activeIndex = (activeIndex + direction + images.length) % images.length;
 
     // Make the new image active
     images[activeIndex].classList.add('modal__img--active');
     images[activeIndex].style.zIndex = 1; // Set z-index of the active image to 1
 
     // Store the updated active index back to the modal
     modal[modalIndex].activeIndex = activeIndex;
   };
 
   // Add event listeners for the previous and next buttons for each modal
   const prevButtons = document.querySelectorAll('.modal__prev');
   const nextButtons = document.querySelectorAll('.modal__next');
 
   prevButtons.forEach((btn, i) => {
     btn.addEventListener('click', (e) => {
       e.stopPropagation();
       changeImage(-1, i); // Move to previous image in the specific modal
     });
   });
 
   nextButtons.forEach((btn, i) => {
     btn.addEventListener('click', (e) => {
       e.stopPropagation();
       changeImage(1, i); // Move to next image in the specific modal
     });
   });
 });
 