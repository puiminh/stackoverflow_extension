console.log("Extension is running...");

const baseAPI = 'https://65bf8a1525a83926ab952c1a.mockapi.io/'

const badgeColor = ['#E8D37D', '#F27878']

const defaultAvatar = 'https://www.gravatar.com/avatar/bc680ed8d2555accacebc0fe2d8c9691?s=256&d=identicon&r=PG';
//work like enum, will get random color

// PAGE 1

var userHoverElements = document.querySelectorAll('.user-info');

userHoverElements.forEach(function(element) {

    var userDetailsElement = element.querySelector('.user-details a');

    if (userDetailsElement) {
        var hrefValue = userDetailsElement.getAttribute('href');
        var userIdMatch = hrefValue.match(/\/users\/(\d+)\/[^/]+/);
        if (userIdMatch && userIdMatch[1]) {
            var userId = userIdMatch[1];
            console.log("User ID:", userId);
        } else {
            console.error("Không tìm thấy User ID.");
        }
    } else {
        console.error("Không tìm thấy thẻ user-details.");
    }

    let newBtn = document.createElement('button');
    newBtn.innerHTML = '+'
    newBtn.id = 'button' + userId;
    newBtn.style = `
        background-color: #82D9AB;
        padding: 4px;
        border-radius: 100%;
        font-weight: bold;
        position: absolute;
        z-index: 999;
        width: 30px;
        height: 30px;
        cursor: pointer;
    `

    element.appendChild(newBtn)

    

    newBtn.addEventListener('click', function() {
        let hiddenContent = element.querySelector('.hidden-content');
        console.log("click fire!", hiddenContent);
        if (hiddenContent == null) {

            let info_user_API = baseAPI + 'info_users/' + 1;
            // README: change 1 -> userId (variable)
            let loader = createLoader();
            element.appendChild(loader);

            fetch(info_user_API)
            .then(response => response.json())
            .then(data => {
                var newHtml = createBlockInfo(data);
                newHtml.classList.add('hidden-content')

                element.removeChild(loader);

                element.appendChild(newHtml);
                hiddenContent = document.querySelector('.hidden-content');
                hiddenContent.style.display = 'block';

            })
            .catch(error => {
                    console.error('Error fetching data:', error)
                    element.removeChild(loader);
                });
        } else {
            hiddenContent.style.display = 'block';
        }

        
    });
})

function createLoader() {
    var loader = document.createElement('div');
    loader.classList.add('loader');
    loader.innerHTML = '<p>Loading...</p>';
    loader.style.cssText =  `
        display: block;
        margin: 10px auto;
        width: fit-content;
        font-weight: bold;
    `
    return loader;
}

function createBlockInfo(data) {

    console.log(data);
    let newHtml = document.createElement('div');

    let dateObject = new Date(data.createdAt);
    let formattedDate = dateObject.toLocaleString();

    let badges = data.badges;
    let badgesHtmlString = '';

    badges.forEach((e,index)=> {
        badgesHtmlString += `
        <li style="border: solid; border-radius: 10px; padding: 8px 4px; border-width: 2px; background-color: ${badgeColor[index%badgeColor.length]}; width: fit-content;">
            ${e}
        </li>   
        
        `
    })
    



    newHtml.style.cssText = `
        margin-top: 20px;
        position: absolute;
        color: black;
        z-index: 999;
    `
    newHtml.innerHTML = `
        <div
        style="
        border: solid;
        border-width: 2px;
        border-radius: 20px;
        padding: 15px 30px;

        background-color: white;

        ">
            <div style="display: flex;
                        justify-content: center;
                        align-items: center;">
                <div class="">
                        <div class="">
                            <img src="${defaultAvatar}" 
                                width="64" height="64" class="bar-sm"></div></a>
                </div>
                <div style="padding-left: 10px">
                    <span style="display: block; font-size: 20px;">${data.displayName}</span>
                    <span style="display: block; font-size: 12px;">Last access: ${formattedDate}</span>
                </div>
            </div>
            <div>

            </div>
            <ul style="list-style: none;
                padding: 0;
                display: grid;
                max-width: 100%;
                width: 100%; 
                margin: 10px 5px;
                "
            >
                <li style="border: solid; border-radius: 10px; padding: 8px 4px; border-width: 2px; background-color: #82D9AB; width: fit-content;">
                    Accepted answer rate: ${data.accuracy}%
                </li>        
            </ul>

            <ul style="list-style: none;
            padding: 0;
            display: flex;
            gap: 1rem;
            max-width: 100%;
            width: 100%;
            margin: 10px 5px;
            "
        >
            ${badgesHtmlString}      
        </ul>
        </div> 

    `;

    let newBtn = document.createElement('button');
    newBtn.innerHTML = 'x';
    newBtn.style = `
        background-color: red;
        padding: 4px;
        border-radius: 100%;
        font-weight: bold;
        position: absolute;
        z-index: 999;
        width: 30px;
        height: 30px;
        cursor: pointer;
        top: 0;
        right: 0;
        color: white;
        border-width: 0.5px;
    `

    newHtml.appendChild(newBtn)

    newBtn.addEventListener('click', function() {
        newHtml.style.display = 'none';
    });
    
    return newHtml;
}


// PAGE 2



const firstTimeWarningBorder = `

padding: 12px 16px;
border: solid;
border-width: 2px;
border-radius: 20px;
border-color: #A13E3E;
margin-bottom: 20px;
`

var answers = document.querySelectorAll('#answers .answer');
var alertHTML = `
<div
style= "
    display: flex;
    gap: 0.5rem;
    margin: 10px auto;
    width: fit-content;
"
>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="SVGRepo_bgCarrier" stroke-width="0"/>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
<g id="SVGRepo_iconCarrier"> <circle cx="12" cy="17" r="1" fill="#000000"/> <path d="M12 10L12 14" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M3.44722 18.1056L10.2111 4.57771C10.9482 3.10361 13.0518 3.10362 13.7889 4.57771L20.5528 18.1056C21.2177 19.4354 20.2507 21 18.7639 21H5.23607C3.7493 21 2.78231 19.4354 3.44722 18.1056Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>
</svg>

<span 
class="alert-text"
style="
    border: solid; 
    border-radius: 10px; 
    padding: 8px 4px; 
    border-width: 2px; 
    background-color: #FFF8BB; 
    width: fit-content;
"
> First time answer</span>
</div>

`;


answers.forEach(function(answer) {

    let answerId = answer.getAttribute('data-answerid');
    let info_comment_API = baseAPI + 'info_comments/' + 2;
    // README: change 1 -> answerId (variable)
    let loader = createLoader();
    answer.insertAdjacentElement('afterbegin',loader);

    fetch(info_comment_API)
    .then(response => response.json())
    .then(data => {
        answer.removeChild(loader);
        if (data.first_time) {
            answer.style.cssText = firstTimeWarningBorder;
            answer.insertAdjacentHTML('afterbegin', alertHTML);
        }
    })
    .catch(error => {
            console.error('Error fetching data:', error)
            answer.removeChild(loader);
        });
});


// PAGE 3

var tagInfoBox = document.createElement('div');
tagInfoBox.id = 'tagInfoBox';

tagInfoBox.style.cssText = `
    width: 400px;
    height: 600px;
    background-color: white;
    border: solid; 
    border-radius: 10px; 
    padding: 8px 4px; 
    border-width: 2px; 
    z-index: 1000;
    display: none;
    position: fixed;
    right: 50px;
`

tagInfoBox.innerHTML = `
    <div style="

    ">

    </div>

`

document.body.appendChild(tagInfoBox);

var postTags = document.querySelectorAll('.post-tag');

postTags.forEach(function(postTag) {
    
    postTag.addEventListener('mouseover', function() {
        console.log("Hover tag...");
    tagInfoBox.style.display = 'block';
    });

    postTag.addEventListener('mouseout', function() {
    tagInfoBox.style.display = 'none';
    });
});