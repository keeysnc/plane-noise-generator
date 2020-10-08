import CoverBg from './js/CoverBg.js'
import Loader from './js/Loader.js'

// init 
const init = () => {
    
    CoverAnimation()
    Modal()
}

// timeline start transition
const CoverAnimation = () => {
    const cover = document.getElementById('cover');
    const title = document.querySelector('.title');
    const btn = document.querySelector('.btn');
    const canvas = document.querySelector('#cover-bg');
    const modal = document.querySelector('.modal');

    const tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });

    //open transition
    tl.to(cover, { background: '#F28080', duration:1, delay:0 })
    .add( () => { CoverBg() }, {onUpdate: null} )
    tl.to( canvas, { opacity: 1, duration:1, delay:1 } )
    tl.staggerTo([ title, btn], .5, { top: 0, duration:2, stagger: .2, delay:0, ease: Back.easeOut })

    //end transition
    btn.addEventListener('click', () => {

        tl.staggerTo([ title, btn], .5, { top: 100, duration:2, stagger: .2, delay:0, ease: Back.easeIn })
        tl.to(cover, { opacity: 0, duration:1.5, delay:1, scaleX:2, ease: Back.easeOut })
        tl.to(cover, { display: 'none', duration:0, delay:0 })
        tl.to(modal, { display: 'block', duration:0, delay:0}).to(modal, { opacity: 1, duration:.2, delay:0})
        
    },false)
}


const Modal = () => {
    const modal = document.querySelector('.modal');
    const exitBtn = modal.querySelector('.close');
    const closeBtn = modal.querySelector('.modal-footer .btn');

    exitBtn.addEventListener('click', closeModal, false);
    closeBtn.addEventListener('click', closeModal, false);

    function closeModal(){
        modal.style.display = 'none';
    }

}

Loader()
init();