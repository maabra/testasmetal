class GalleryManager{constructor(){this.currentImageIndex=0;this.images=[];this.autoRotateInterval=null;this.loadedImages=new Set();this.imageCache=new Map();this.imageExtensions=['.jpg','.jpeg','.png','.webp','.gif'];this.init()}
async init(){const thumbnailContainer=document.getElementById("thumbnailContainer");if(!thumbnailContainer){return}
await this.discoverImages();this.generateThumbnails();this.preloadImages();this.updateThumbnailSelection();this.startAutoRotate();this.setupKeyboardNavigation()}
async discoverImages(){this.images=[];for(let i=1;i<=63;i++){this.images.push(`images/galerija/slika${i}.jpg`)}
try{const response=await fetch('images/manifest.txt');if(response.ok){const manifestText=await response.text();const manifestImages=manifestText.split('\n').filter(line=>line.trim()).filter(line=>this.imageExtensions.some(ext=>line.toLowerCase().includes(ext)));if(manifestImages.length>0){this.images=manifestImages}}}catch(error){console.log('No manifest file found, using sequential image naming')}}
generateThumbnails(){const container=document.getElementById("thumbnailContainer");if(!container){return}
container.innerHTML="";this.images.forEach((imagePath,index)=>{const thumbnailWrapper=document.createElement("div");thumbnailWrapper.className="thumbnail-wrapper";const thumbnail=document.createElement("img");thumbnail.className="thumbnail";thumbnail.src=imagePath;thumbnail.alt=`Galerija slika ${index + 1}`;thumbnail.onclick=()=>this.showImage(index);thumbnail.loading="lazy";thumbnail.onerror=()=>{thumbnail.style.display='none';console.warn(`Image not found: ${imagePath}`)};thumbnailWrapper.appendChild(thumbnail);container.appendChild(thumbnailWrapper)})}
preloadImages(){this.images.forEach((imagePath,index)=>{const img=new Image();img.onload=()=>{this.loadedImages.add(index);this.imageCache.set(index,img)};img.onerror=()=>{console.warn(`Failed to preload image: ${imagePath}`)};img.src=imagePath})}
showImage(index,fromAutoRotate=!1){if(index<0||index>=this.images.length)return;this.currentImageIndex=index;const mainImage=document.getElementById("rotatingImage");const imageCounter=document.getElementById("imageCounter");if(!mainImage){return}
if(this.imageCache.has(index)){mainImage.src=this.imageCache.get(index).src}else{mainImage.src=this.images[index]}
if(imageCounter){imageCounter.textContent=`${index + 1} / ${this.images.length}`}
this.updateThumbnailSelection();if(!fromAutoRotate){this.stopAutoRotate()}
mainImage.style.opacity='0.7';setTimeout(()=>{mainImage.style.opacity='1'},100)}
updateThumbnailSelection(){const thumbnails=document.querySelectorAll('.thumbnail');if(thumbnails.length===0){return}
thumbnails.forEach((thumb,index)=>{if(index===this.currentImageIndex){thumb.classList.add('active')}else{thumb.classList.remove('active')}})}
nextImage(fromAutoRotate=!1){this.currentImageIndex=(this.currentImageIndex+1)%this.images.length;this.showImage(this.currentImageIndex,fromAutoRotate)}
prevImage(){this.currentImageIndex=(this.currentImageIndex-1+this.images.length)%this.images.length;this.showImage(this.currentImageIndex)}
startAutoRotate(){this.stopAutoRotate();this.autoRotateInterval=setInterval(()=>this.nextImage(!0),4000)}
stopAutoRotate(){if(this.autoRotateInterval){clearInterval(this.autoRotateInterval);this.autoRotateInterval=null}}
setupKeyboardNavigation(){document.addEventListener('keydown',(event)=>{switch(event.key){case 'ArrowLeft':this.prevImage();break;case 'ArrowRight':this.nextImage();break;case ' ':event.preventDefault();if(this.autoRotateInterval){this.stopAutoRotate()}else{this.startAutoRotate()}
break;case 'Escape':this.stopAutoRotate();break}})}}
let galleryManager;window.addEventListener('DOMContentLoaded',()=>{const thumbnailContainer=document.getElementById("thumbnailContainer");if(thumbnailContainer){galleryManager=new GalleryManager()}});function nextImage(){if(galleryManager)galleryManager.nextImage();}
function prevImage(){if(galleryManager)galleryManager.prevImage();}
function showImage(index){if(galleryManager)galleryManager.showImage(index);}