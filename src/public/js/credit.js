"use strict";

function credits() {
    Swal.fire({

        icon:'info',
        title:'<strong>Credits</strong>',
        text:'Check out the bottom of our About Section to see our team!',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        confirmButtonText:'Go!',
        
        cancelButtonColor: '#d33',
        cancelButtonText:'Close',
          backdrop: `
          rgba(100,0,0,0.7)
            `
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/about#sectionn';
      }
    })
}

