function Modals() {
    var modal = document.createElement('div');
    // modal.innerHTML = '<div class="modal-wrapper modal-lg"></div>' +
    // '<div class="modal-content">' + 
    // '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>' + 
    // '<div id="modal_body" class="modal-body"></div>' + 
    // '<div class="modal-footer"></div>' + 
    // '</div>';
    modal.id = 'modal';
    modal.classList.add('modal');

    document.body.appendChild(modal);
    var template_url = template_url;

    this.add = {
        open: function(template_url, payment) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if(modal) {
                        modal.innerHTML = xhr.responseText;
                    }
                }
            }
            xhr.open('GET', template_url, true);
            xhr.send(null);
            modal.classList.add('show');
            console.log(template_url);
        }
    };
};
