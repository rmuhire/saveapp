save.controller('PartnerCtrl', ['$scope', '$http','$location', function($scope,$http,$location){
              $(document).ready(function(){
               $('[data-toggle="tooltip"]').tooltip();
             });

            /*Partner hide-and-show*/
            $("#partner-details").click(function(event){
               event.preventDefault();
                $("#partner-view").hide();
                $("#isolated-project-view").show();
            });
            /*back to partner-view*/
            $(".back-to-partner-view").click(function(event){
               event.preventDefault();
                $("#isolated-project-view").hide();
                $("#partner-view").show();
            });

            $(".btn-add-new-project").click(function(event){
               event.preventDefault();
                $("#isolated-project-view,#partner-view").hide();
                $("#add-new-project").show();
            });
            $(".back-to-agent-detail").click(function(event){
               event.preventDefault();
                $("#add-new-project").hide();
                $("#isolated-project-view").show();
            });

          $(function() {
            // Create the close button
            var closebtn = $('<button/>', {
                type:"button",
                text: 'x',
                id: 'close-preview',
                style: 'font-size: initial;',
            });
            closebtn.attr("class","close pull-right");
            // Set the popover default content
            $('.image-preview').popover({
                trigger:'manual',
                html:true,
                title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
                content: "There's no image",
                placement:'bottom'
            });
            // Clear event
            $('.image-preview-clear').click(function(){
                $('.image-preview').attr("data-content","").popover('hide');
                $('.image-preview-filename').val("");
                $('.image-preview-clear').hide();
                $('.image-preview-input input:file').val("");
                $(".image-preview-input-title").text("");
            });
            // Create the preview image
            $(".image-preview-input input:file").change(function (){
                var img = $('<img/>', {
                    id: 'dynamic',
                    width:250,
                    height:200
                });
                var file = this.files[0];
                var reader = new FileReader();
                // Set preview image into the popover data-content
                reader.onload = function (e) {
                    $(".image-preview-input-title").text("");
                    $(".image-preview-clear").show();
                    $(".image-preview-filename").val(file.name);
                    img.attr('src', e.target.result);
                    $(".image-preview").attr("data-content",$(img)[0].outerHTML).popover("show");
                }
                reader.readAsDataURL(file);
            });
        });


}])
