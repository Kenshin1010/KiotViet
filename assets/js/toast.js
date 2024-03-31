// Toast function
function toast({
    type='info', 
    message='', 
    duration = 1000
}) {
    const main = document.getElementById('toast');
    if(main){
        const toast = document.createElement('div');

        // Auto remove toast
        const autoRemoveId = setTimeout(function(){
            main.removeChild(toast);
            // Sau khi toast biến mất, làm mới trang web
            location.reload();
        }, duration);

        // Remove toast when onClick .toast
        toast.onClick = function(e){
            if(e.target.closest('.toast')){
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
                // Sau khi toast biến mất, làm mới trang web
            location.reload();
            }
        }

        const icons = {
            success: 'fas fa-check',
            info: 'fas fa-circle-info',
            warning: 'fas fa-circle-exclamation',
            error: 'fas fa-triangle-exclamation'
        };

        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add('toast', `toast-${type}`);
        toast.style.animation = `slideInleft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
        <div class="toast">
        <div class="toast-icon">
          <i class="${icon}"></i>
        </div>
        <div class="toast-body">
          <p class="toast-msg">${message}</p>
        </div>
    </div>
        `;
    main.appendChild(toast);
    }
}

// function showSuccessToast(){
//     toast({
//         type: 'success', 
//         message: '', 
//         duration: 3000
//       });
// }

// function showInfoToast(){
//     toast({
//         type: 'info', 
//         message: '', 
//         duration: 3000
//       });
// }

// function showWarningToast(){
//     toast({
//         type: 'warning', 
//         message: '', 
//         duration: 3000
//       });
// }

// function showErrorToast(){
//     toast({
//         type: 'error', 
//         message: '', 
//         duration: 3000
//       });
// }

// Toast function show error to edit
function toastEdit({
    type='error', 
    message='', 
    duration = 3000
}) {
    const main = document.getElementById('toast');
    if(main){
        const toastEdit = document.createElement('div');

        // Auto remove toast
        const autoRemoveIdEdit = setTimeout(function(){
            main.removeChild(toastEdit);
            // Sau khi toast biến mất, làm mới trang web
            // location.reload();
        }, duration);

        // Remove toast when onClick .toast
        toastEdit.onClick = function(e){
            if(e.target.closest('.toast-error')){
                main.removeChild(toastEdit);
                clearTimeout(autoRemoveIdEdit);
                // Sau khi toast biến mất, làm mới trang web
            // location.reload();
            }
        }

        const icons = {
            success: 'fas fa-check',
            info: 'fas fa-circle-info',
            warning: 'fas fa-circle-exclamation',
            error: 'fas fa-triangle-exclamation'
        };

        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toastEdit.classList.add('toast', `toast-error`);
        toastEdit.style.animation = `slideInleft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toastEdit.innerHTML = `
        <div class="toast toast-error">
        <div class="toast-icon">
          <i class="fas fa-triangle-exclamation"></i>
        </div>
        <div class="toast-body">
          <p class="toast-msg">${message}</p>
        </div>
    </div>
        `;
    main.appendChild(toastEdit);
    }
}