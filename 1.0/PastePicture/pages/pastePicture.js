//Delcare clear paste function 
function _pasteClearFile( obj)
{
    var tdObj = $(obj).parent();
    //clear img 
    //$(tdObj).find('img').attr('src', '');
    //$(tdObj).find('img').removeAttr('src');
    
    //clear img control
    $(tdObj).find('img').removeAttr('src').replaceWith($(tdObj).find('img').clone());
    //clear the hidden img value 
    var ufile = $('#upload_form_open form input[name=ufile]');  
    if( ufile.length <= 0)
    {
        alert('Error , can not get the upload paste field.');
        return;
    }
    $(ufile).val('');
    
    //hide ima, submit , button
    $(tdObj).find('input:button').hide();
    $(tdObj).find('input:submit').hide();
    $(tdObj).find('img').hide();
    
    //show texarea
    $(tdObj).find('textarea').show();
    

}

//Declare paste function 
function _pasteFile(ev, taObj) {
    var clipboardData, items, item; //for chrome            
   
    if (ev && (clipboardData = ev.clipboardData) && (items = clipboardData.items) && (item = items[0]) && item.kind == 'file' && item.type.match(/^image\//i)) {

        var blob = item.getAsFile()
        var reader = new FileReader();
        reader.onload = function () {
            //var sHtml = '<img class="_taImg" src="' + event.target.result + '">';
            var sBase64 = event.target.result;
            var tdObj = $(taObj).parent();
            
            //hide textarea 
            $(tdObj).find('textarea').hide();
            
            //show img, clear, submit             
            $(tdObj).find('input:button').show();
            $(tdObj).find('input:submit').show();
            $(tdObj).find('img').show();
            
            //set img src
            $(tdObj).find('img').attr('src', sBase64);
            
            var ufile = $('#upload_form_open form input[name=ufile]');  
            if( ufile.length <= 0)
            {
                alert('Error , can not get the upload paste field.');
                return;
            }
            $(ufile).val(sBase64);

        }
        reader.readAsDataURL(blob);
        return false;
    } else {
       // alert('not have image');
       return false;
    }

}
$("document").ready(function(){
    //when page load finish , auto add control    
    $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase()); 
    if (!$.browser.chrome) return;//Only Work on Chrome
    var _selectRet = $('input[name=bug_id]:hidden:eq(0)');
    var _bugId;
    var _bugFileToken;
    
    //get bug id 
    if( _selectRet.length > 0 ) 
    {
        //get the bug id 
        _bugId = $(_selectRet).val();
    }   
    else 
    {
        //not find the bug id         
        return;
    }
    //get file token
    var _selectRet = $('input[name=bug_file_add_token]:hidden:eq(0)');
     if( _selectRet.length > 0 ) 
    {
        //get the tokoen value
        _bugFileToken = $(_selectRet).val();
    }   
    else 
    {
        //not find the token value
        return;
    }
    // div id upload_form_open
    var uf = $('#upload_form_open');    
    var sHtml = '   ' +
                ' <form method="post" enctype="multipart/form-data" action="plugin.php?page=PastePicture/bug_file_add.php">  ' +
                ' <input type="hidden" name="bug_file_add_token" value="' + _bugFileToken + '" /> ' +               
                '   <input id="ufile" name="ufile" type="hidden" />                                                       '+
                '   <input id="bug_id" name="bug_id" value="' + _bugId + '" type="hidden" />                                        '+
                ' <table class="width100" cellspacing="1">                                                                   ' +
                '    <tr class="row-1">                                                                                      ' +
                '        <td class="category" width="15%">                                                                   ' +
                '            &nbsp;                                                                                          ' +                
                '        </td>                                                                                               ' +
                '        <td width="85%">                                                                                    ' +
                '            <textarea id="_taPasteFile" onpaste="_pasteFile(event, this)"   readonly>' +                        
                'Press Ctrl + V</textarea>                                                                                 ' +      
                '<img class="_taImg" style="display:none" src=""/>                                                         ' +
                '<input type="button" class="button" style="display:none" onclick="_pasteClearFile(this)"  value="Clear" />' + 
                '<input type="submit" class="button"  style="display:none" value="Upload Paste File" />' +
                '        </td>                                                                                               ' +
                '    </tr>                                                                                                   ' +
                '</table>                                                                                                    ' +
                '</form>                                                                                                     ' ;
    $(uf).append(sHtml);
                
});