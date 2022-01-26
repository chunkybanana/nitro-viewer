let partNum = 1, chapter = 1, comic = 1, images = [];

function loadComic(){
    location.hash = `${partNum}-${chapter}-${comic}`;
    let comicImg = document.getElementById('comicimg');
    comicImg.src = `comics/p${partNum}/c${chapter}/${comic}.png`;
    comicImg.title = parts[partNum - 1][chapter - 1][comic - 1];
    document.getElementById('part').innerText = partNum;
    document.getElementById('chapter').innerText = chapter;
    document.getElementById('comicnum').innerText = comic;
    
    preloadImage(partNum, chapter, comic + 1);
    preloadImage(partNum, chapter, comic + 2);
    preloadImage(partNum, chapter, comic + 3);
    preloadImage(partNum, chapter, comic - 1);
    preloadImage(partNum, chapter, comic - 2);
    preloadImage(partNum, chapter + 1, 1);
    preloadImage(partNum, chapter + 2, 1);
    preloadImage(partNum, chapter - 1, 1);
    preloadImage(partNum, chapter - 2, 1);
    preloadImage(partNum, chapter + 1, 2);
    preloadImage(partNum, chapter + 1, 3);

    preloadImage(1, 1, 1);
    preloadImage(2, 1, 1);
}
function preloadImage(part, chapter, comic){
    if(part <= 0 || part > parts.length || chapter <= 0 || chapter > parts[part - 1].length || comic <= 0 || comic > parts[part - 1]?.[chapter - 1]?.length) return;
    let url = `comics/p${part}/c${chapter}/${comic}.png`;
    if(!images.find(value => value.src == 'https://se-nitro.surge.sh/' + url)){
        let img = new Image();
        img.src = url;
        images.push(img)
    }
}
window.addEventListener('load', _ => {
    let hash = location.hash.slice(1).split('-');
    partNum = parseInt(hash[0]) || 1;
    chapter = parseInt(hash[1]) || 1;
    comic = parseInt(hash[2]) || 1;
    loadComic();
})