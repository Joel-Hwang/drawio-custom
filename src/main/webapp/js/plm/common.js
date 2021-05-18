let spinner = {
    show : ()=>{
        document.querySelector('#spinner').style.display = 'block';
    },
    hide : () => {
        document.querySelector('#spinner').style.display = 'none';
    },
    toggle : () => {
        let doc = document.querySelector('#spinner');
        if(doc.style.display === 'none') spinner.show();
        else spinner.hide();
    }
}