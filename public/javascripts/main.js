var optionsTime = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit' };
var userLogin = {...userLogin} // define

document.addEventListener('DOMContentLoaded', function() {
    // When click btn login GG, app redirect /auth/google
    var btnLoginWithGoogle = document.querySelector('.btn-login-with-gg');

    if (btnLoginWithGoogle) {
        btnLoginWithGoogle.onclick = function() {
            window.location.href = '/auth/google';
        }
    }

    // Hidden error when focus on input
    var inputsElementinLogin = document.querySelectorAll('.form-control-login');
    var errorElement = document.querySelector('.alert.alert-danger');

    if (inputsElementinLogin) {
        inputsElementinLogin.forEach(input => {
            input.onfocus = function() {
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            }
        });
    }

    // Handle btn hamburger
    var menuBtnElement = document.querySelector('.header__nav-icon.ti-menu');
    var modalOverlay = document.querySelector('.overlay');
    var navElement = document.querySelector('.header__navigation');
    var closeNav = document.querySelector('.navigation-close');

    if (menuBtnElement) {
        menuBtnElement.onclick = function() {
            modalOverlay.style.display = 'block';
            navElement.style.opacity = '1';
            navElement.style.transform = 'translateX(0)';
        }
        closeNav.onclick = function() {
            modalOverlay.style.display = 'none';
            navElement.style.opacity = '0';
            navElement.style.transform = 'translateX(-100%)';
        }
    }

    if (modalOverlay) {
        modalOverlay.onclick = function() {
            modalOverlay.style.display = 'none';
            navElement.style.opacity = '0';
            navElement.style.transform = 'translateX(-100%)';
        }
    }

    // Handle btn triangle down for user
    var menuUserBtn = document.querySelector('.header__nav-item.header__nav-icon-down');
    var menuUser = document.querySelector('.header__nav-user-menu');
    var overlayTransparent = document.querySelector('.overlay-transparent');

    if (menuUserBtn) {
        menuUser.style.transform = 'scale(0)';
        menuUserBtn.onclick = function() {
            if (menuUser.style.transform === 'scale(0)') {
                menuUser.style.transform = 'scale(1)';
                overlayTransparent.style.display = 'block';
            } else {
                menuUser.style.transform = 'scale(0)';
                overlayTransparent.style.display = 'none';
            }
        }
    }

    // Handle remember me
    var usernameElement = document.getElementById('username');
    var passwordElement = document.getElementById('password');
    var rememberMeElement = document.getElementById('rememberMe');

    function handleRememberMe() {
        if (rememberMeElement.checked === true) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('username', usernameElement.value);
            localStorage.setItem('password', passwordElement.value);
        } else {
            localStorage.setItem('rememberMe', 'false');
            localStorage.setItem('username', '');
            localStorage.setItem('password', '');
        }
    }

    if (rememberMeElement) {
        rememberMeElement.onclick = function() {
            handleRememberMe();
        }
    }

    if (usernameElement) {
        usernameElement.onchange = function() {
            handleRememberMe();
        }
    }

    if (passwordElement) {
        passwordElement.onchange = function() {
            handleRememberMe();
        }
    }

    if (rememberMeElement) {
        if (localStorage.rememberMe === 'true') {
            rememberMeElement.checked = true;
            usernameElement.value = localStorage.getItem('username');
            passwordElement.value = localStorage.getItem('password');
        } else {
            rememberMeElement.checked = false;
        }
    }

    // Handle sub-item
    var messageClassify = document.querySelector('.navigation-item.navigation-wrap-sub-item');
    var triangleLeftIcon = document.querySelector('.ti-angle-left.sub-item-icon');
    var triangleDownIcon = document.querySelector('.ti-angle-down.sub-item-icon');
    var subItems = document.querySelectorAll('.navigation-sub-item');
    var navLogout = document.querySelector('.navigation-logout');
    if (messageClassify) {
        triangleLeftIcon.style.display = 'block';
        messageClassify.onclick = function() {
            if (triangleLeftIcon.style.display === 'block') {
                triangleLeftIcon.style.display = 'none';
                triangleDownIcon.style.display = 'block';
                navLogout.style.transform = 'translateY(0)';
                subItems.forEach(subItem => {
                    subItem.style.transform = 'translateY(0)';
                });
            } else {
                triangleLeftIcon.style.display = 'block';
                triangleDownIcon.style.display = 'none';
                navLogout.style.transform = 'translateY(-300%)';
                subItems.forEach(subItem => {
                    subItem.style.transform = 'translateY(-300%)';
                });
            }
        }
    }

    // Check input value in form create account
    var usernameFormCreateAccount = document.getElementById('input-create-username');
    var passwordFormCreateAccount = document.getElementById('input-create-password');
    var nameFormCreateAccount = document.getElementById('input-create-name');
    var messageErrorFormCreateAccount = document.querySelector('.form-message');
    var btnSubmitCreateAccount = document.querySelector('.btn-submit-create-account');
    var formCreateAccount = document.querySelector('.form-create-account');
    if (btnSubmitCreateAccount) {
        btnSubmitCreateAccount.onclick = function() {
            var error;

            for(let i = 0; i < listUser.length; i++) {
                if (usernameFormCreateAccount.value === listUser[i].username) {
                    usernameFormCreateAccount.focus();
                    error = 'Account already exists';
                    break;
                } else if (usernameFormCreateAccount.value === '') {
                    error = 'Please enter your username';
                    usernameFormCreateAccount.focus();
                } else if (passwordFormCreateAccount.value === '') {
                    error = 'Please enter your password';
                    passwordFormCreateAccount.focus();
                } else if (passwordFormCreateAccount.value.length < 6) {
                    error = 'Password must be at least 6 characters';
                    passwordFormCreateAccount.focus();
                } else if (nameFormCreateAccount.value === '') {
                    error = 'Please enter your name department';
                    nameFormCreateAccount.focus();
                } else if (nameFormCreateAccount.value == listUser[i].name) {
                    error = 'Department name already exists';
                    nameFormCreateAccount.focus();
                    break;
                } else {
                    error = '';
                }
            }
    
            if (error) {
                messageErrorFormCreateAccount.style.display = 'block';
                messageErrorFormCreateAccount.innerHTML = error;
            } else {
                messageErrorFormCreateAccount.style.display = 'none';
                formCreateAccount.submit();
            }
    
            usernameFormCreateAccount.addEventListener('keydown', function () {
                messageErrorFormCreateAccount.style.display = 'none';
            });
    
            passwordFormCreateAccount.addEventListener('keydown', function () {
                messageErrorFormCreateAccount.style.display = 'none';
            });
            
            nameFormCreateAccount.addEventListener('keydown', function () {
                messageErrorFormCreateAccount.style.display = 'none';
            });
        }
    }

    // Check input value in form change password
    var currentPassword = document.getElementById('input-current-password');
    var newPassword = document.getElementById('input-new-password');
    var confirmPassword = document.getElementById('input-confirm-password');
    var messageErrorChangePassword = document.querySelector('.form-message-change-password');
    var btnChangePassword = document.querySelector('.btn-change-password');
    var formChangePassword = document.querySelector('.form-change-password');
    
    if (btnChangePassword) {
        btnChangePassword.onclick = function() {
            var error;
    
            if (currentPassword.value === '') {
                error = 'Please enter your current password';
                currentPassword.focus();
            } else if (currentPassword.value !== password) {
                error = 'Current password is invalid';
                currentPassword.focus();
            } else if (newPassword.value === '') {
                error = 'Please enter your new password';
                newPassword.focus();
            } else if (newPassword.value.length < 6) {
                error = 'Password must be at least 6 characters';
                newPassword.focus();
            } else if (confirmPassword.value === '') {
                error = 'Please enter your confirm password';
                confirmPassword.focus();
            } else if (confirmPassword.value !== newPassword.value) {
                error = 'Confirm password does not match';
                confirmPassword.focus();
            } else {
                error = '';
            }
    
            if (error) {
                messageErrorChangePassword.style.display = 'block';
                messageErrorChangePassword.innerHTML = error;
            } else {
                messageErrorChangePassword.style.display = 'none';
                formChangePassword.submit();
            }
    
            currentPassword.addEventListener('keydown', function () {
                messageErrorChangePassword.style.display = 'none';
            });
    
            newPassword.addEventListener('keydown', function () {
                messageErrorChangePassword.style.display = 'none';
            });
            
            confirmPassword.addEventListener('keydown', function () {
                messageErrorChangePassword.style.display = 'none';
            });
        }
    }

    // Handle Btn back in form create account & form change password
    if (btnSubmitCreateAccount || btnChangePassword) {
        document.querySelector('.wrap-icon-back').onclick = () => {
            window.location.href = document.referrer;
        };
    }

    // Handle checked = true for form management scope
    var checkboxList = document.querySelectorAll('.form-authorized-account input[type = checkbox]');
    var formAuthorized = document.querySelector('.form-authorized-account');
    
    if (formAuthorized) {
        departmentUser.department.forEach(item => {
            checkboxList.forEach(checkbox => {;
                if (item === checkbox.value) {
                    checkbox.checked = true;
                }
            })
        });

        // Handle Btn back in form authorized
        document.querySelector('.wrap-icon-back-form-authorized').onclick = () => {
            window.location.href = document.referrer;
        };
    }

    // When click btn edit profile, will show modal
    var btnEditProfile = document.querySelector('.btn-edit-prof');
    var modal = document.querySelector('.modal');
    var btnCloseEditProf = document.querySelector('.btn-close-edit-prof');

    if (btnEditProfile) {
        btnEditProfile.onclick = function() {
            modal.style.display = 'flex';
            $('.wrap-form-edit-prof').css('display', 'block');
            $('.wrap-form-edit-post-news').css('display', 'none');
        }
    }

    if (btnCloseEditProf) {
        btnCloseEditProf.onclick = function() {
            modal.style.display = 'none';
        }
    }

    // Handler edit profile using AJAX
    if (btnEditProfile) {
        $('.form-edit-prof').on('submit', function(e) {
            var userId = e.target.dataset.id;
            e.preventDefault();
            var formData = new FormData(this);
            let profile = '';
    
            $.ajax({
                url: '/profile/' + userId + '/edit',
                type: 'PUT',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    profile += `
                        <li class="prof__timeline-info-item">
                            <i class="fas fa-user-graduate prof__timeline-info-icon"></i>
                            <span><strong>Name:</strong> ${data.data.name}</span>
                        </li>
                        <li class="prof__timeline-info-item">
                            <i class="fas fa-user-friends prof__timeline-info-icon"></i>
                            <span><strong>Group:</strong> ${data.data.group}</span>
                        </li>
                        <li class="prof__timeline-info-item">
                            <i class="fas fa-graduation-cap prof__timeline-info-icon"></i>
                            <span><strong>Faculty:</strong> ${data.data.faculty}</span>
                        </li>`
                    if (data.data.email) {
                        profile +=`
                            <li class="prof__timeline-info-item">
                                <i class="fas fa-envelope prof__timeline-info-icon"></i>
                                <span><strong>E-mail:</strong> ${data.data.email}</span>
                            </li>`;
                    }
            
                    // Update all name in page
                    if (userLogin.userType !== 'admin') {
                        $('.heading__navigation-user-name').html(data.data.name);
                        $('.header__nav-text-name').html(data.data.name);
                    }
                    $('.profile-name-heading').html(data.data.name);

                    // Update all avatar in page
                    if (userLogin.userType !== 'admin') {
                        $('.header__nav-avt.header__navigation-avt').attr('src', data.data.avatar);
                        $('.header__nav-avt').attr('src', data.data.avatar);
                    }
                    $('.profile-image').attr('src', data.data.avatar);
        
                    $('.prof__timeline-info-list').html(profile);
                    window.location.href = window.location.href;
                    $('.modal').hide();
                },
                error: function(error) {
                    console.log('error', error);
                }
            })
        });
    }

    // Handle show form post news
    var showFormPostNews = document.querySelector('.timeline__wrap-input-open');

    if (showFormPostNews) {
        showFormPostNews.onclick = function() {
            modal.style.display = 'flex';
            $('.wrap-form-edit-post-news').css('display', 'none');
        }
    }

    // Handle show input video link in form post news
    var btnShowVideoLink = document.querySelector('.fab.fa-youtube.form-post-news-icon');
    var wrapInputVideoLink = document.querySelector('.form-group-video-link');
    
    if (btnShowVideoLink) {
        wrapInputVideoLink.style.display = 'none';
        $('#form-post-news-input-link-video').attr('required', false);

        btnShowVideoLink.onclick = function() {
            if (wrapInputVideoLink.style.display === 'none') {
                wrapInputVideoLink.style.display = 'flex';
                $('#form-post-news-input-link-video').attr('required', true);
            } else {
                wrapInputVideoLink.style.display = 'none';
                $('#form-post-news-input-link-video').removeAttr('required');
            }
        }
    }

    // Function show img before upload in db
    function showImage(input, imgElement) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $(imgElement).attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    var btnCloseImageFormPost = $('.btn-close-image-form-post-news');

    $('#form-post-news-upload-img').change(function() {
        $('.wrap-show-img__input-img').css({
            'height': '200px',
            'display': 'block',
            'margin-top': '8px',
        });

        btnCloseImageFormPost.css('display', 'block');
        showImage(this, '.textarea__img-form-post-news');
    });

    // Handle btn close image
    if (btnCloseImageFormPost) {
        btnCloseImageFormPost.click(function() {
            btnCloseImageFormPost.css('display', 'none');
            $('.wrap-show-img__input-img').css('display', 'none');
            $('#form-post-news-upload-img').val('');
        });
    }

    // Handle post a news
    var openFormPost = $('.timeline__wrap-input-open');

    if (openFormPost) {
        $('.form-post-news').on('submit', function(e) {
            var authorId = e.target.dataset.id;
            e.preventDefault();
            var formData = new FormData(this);

            $.ajax({
                url: '/post/author/' + authorId,
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    var timePost = new Date(data.dataPost.createdAt).toLocaleString('en-US', optionsTime);
                    var aPost1 = `
                        <div class="timeline-news mb-16 timeline-news${data.dataPost._id}">
                            <div class="timeline-news__heading">
                                <div class="timeline-news__heading-author">
                                    <img src="${data.dataAuthor.avatar}" alt="" class="timeline-news__heading-author-img">
                                    <div class="timeline-news__heading-author-wrap">
                                        <a href="/profile/${data.dataAuthor._id}" class="timeline-news__heading-author-name">${data.dataAuthor.name}</a>
                                        <span class="timeline-news__heading-time">
                                            ${timePost}<i class="fas fa-globe-americas timeline-news__heading-icon"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="timeline-news__heading-options">
                                    <i class="fas fa-ellipsis-h"></i>
                                    
                                    <div class="overlay-transparent-post"></div>
                                    <ul class="timeline-news__options-list">
                                        <li class="timeline-news__options-item timeline-news__options-item-edit" data-id="${data.dataPost._id}"
                                            data-content="${data.dataPost.content}" data-image="${data.dataPost.image}" data-video="${data.dataPost.video}">
                                            <i class="fas fa-edit timeline-news__options-icon"></i>Edit post
                                        </li>
                                        <li class="timeline-news__options-item timeline-news__options-item-delete" data-id="${data.dataPost._id}">
                                            <i class="fas fa-trash-alt timeline-news__options-icon"></i>Delete post
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <p class="timeline-news__content-text">${data.dataPost.content}</p>`;
                    
                    var aPost2;
                    if (data.dataPost.video) {
                        aPost2 = `<iframe class="timeline-news__content-video" width="560" height="315" src="https://www.youtube.com/embed/${data.dataPost.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                    } else {
                        aPost2 = '';
                    }

                    var aPost3;
                    if (data.dataPost.image) {
                        aPost3 = `<img src="${data.dataPost.image}" alt="" class="timeline-news__content-img">`;
                    } else {
                        aPost3 = '';
                    }

                    var aPost4 = `
                            <div class="timeline-news__wrap-quantity-cmt">
                                <span class="timeline-news__show-react">
                                    <i class="fab fa-gratipay timeline-news__icon-show-react color-red"></i> 100
                                </span>
                                <p class="timeline-news__quantity-cmt">
                                    <strong class="timeline-news__quantity">${data.dataPost.comments.length}</strong> <span>Comments</span>
                                </p>
                            </div>
                            <div class="separate-timeline-news"></div>
                            <div class="timeline-news__show-activity">
                                <span class="timeline-news__activity-liked">
                                    <i class="far fa-thumbs-up timeline-news__activity-icon"></i> Like
                                </span>
                                <span class="timeline-news__activity-comment">
                                    <i class="far fa-comment-alt timeline-news__activity-icon timeline-news__cmt-icon"></i> Comment
                                </span>
                            </div>
                            <div class="separate-timeline-news"></div>
                            <form class="timeline-news__form-cmt${data.dataPost._id} timeline-news__form-cmt" enctype="multipart/form-data" 
                                data-id="${data.dataAuthor._id}" data-postid="${data.dataPost._id}">
                                <div class="form-group-cmt">
                                    <label for="input-comment${data.dataPost._id}" class="form-label-cmt">
                                        <img src="${data.dataAuthor.avatar}" alt="" class="timeline-news__footer-cmt-img">
                                    </label>
                                    <input type="text" class="form-control-cmt" id="input-comment${data.dataPost._id}" name="contentCmt" placeholder="Write a comment..." required>
                                    <button class="btn-submit-cmt"><i class="fas fa-paper-plane"></i></button>
                                </div>
                            </form>
                        </div>`;

                    var aPost = aPost1 + aPost2 + aPost3 + aPost4;

                    $('.timeline__form-post').after(aPost);

                    $('.form-post-news-textarea').val('');
                    $('#form-post-news-input-link-video').val('');
                    btnCloseImageFormPost.css('display', 'none');
                    $('.wrap-show-img__input-img').css('display', 'none');
                    $('#form-post-news-upload-img').val('');
                    $('.modal').hide();

                    $('.timeline-news__options-list').css('display', 'none');
                },
                error: function(error) {
                    console.log(error);
                }
            })
        })
    }

    // Function delete a post
    function deletePost(id) {
        $.ajax({
            url: '/post/' + id + '/delete',
            type: 'DELETE',
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                $('.timeline-news' + id).remove();
            },
            error: function(error) {
                console.log(error);
            }
        })
    }

    // Function edit a post
    function editPost(id, formData) {
        $.ajax({
            url: '/post/' + id + '/edit',
            type: 'PUT',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                var timePost = new Date(data.data.createdAt).toLocaleString('en-US', optionsTime);
                var aPost1 = `
                    <div class="timeline-news__heading">
                        <div class="timeline-news__heading-author">
                            <img src="${data.data.authorId.avatar}" alt="" class="timeline-news__heading-author-img">
                            <div class="timeline-news__heading-author-wrap">
                                <a href="/profile/${data.data.authorId._id}" class="timeline-news__heading-author-name">${data.data.authorId.name}</a>
                                <span class="timeline-news__heading-time">
                                    ${timePost}<i class="fas fa-globe-americas timeline-news__heading-icon"></i>
                                </span>
                            </div>
                        </div>
                        <div class="timeline-news__heading-options">
                            <i class="fas fa-ellipsis-h"></i>
                        
                            <div class="overlay-transparent-post"></div>
                            <ul class="timeline-news__options-list">
                                <li class="timeline-news__options-item timeline-news__options-item-edit" data-id="${data.data._id}"
                                    data-content="${data.data.content}" data-image="${data.data.image}" data-video="${data.data.video}">
                                    <i class="fas fa-edit timeline-news__options-icon"></i>Edit post
                                </li>
                                <li class="timeline-news__options-item timeline-news__options-item-delete" data-id="${data.data._id}">
                                    <i class="fas fa-trash-alt timeline-news__options-icon"></i>Delete post
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p class="timeline-news__content-text">${data.data.content}</p>`;
                
                var aPost2;
                if (data.data.video) {
                    aPost2 = `<iframe class="timeline-news__content-video" width="560" height="315" src="https://www.youtube.com/embed/${data.data.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                } else {
                    aPost2 = '';
                }

                var aPost3;
                if (data.data.image) {
                    aPost3 = `<img src="${data.data.image}" alt="" class="timeline-news__content-img">`;
                } else {
                    aPost3 = '';
                }

                var aPost4 = `
                    <div class="timeline-news__wrap-quantity-cmt">
                        <span class="timeline-news__show-react">
                            <i class="fab fa-gratipay timeline-news__icon-show-react color-red"></i> 100
                        </span>
                        <p class="timeline-news__quantity-cmt">
                            <strong class="timeline-news__quantity">${data.data.comments.length}</strong> <span>Comments</span>
                        </p>
                    </div>
                    <div class="separate-timeline-news"></div>
                    <div class="timeline-news__show-activity">
                        <span class="timeline-news__activity-liked">
                            <i class="far fa-thumbs-up timeline-news__activity-icon"></i> Like
                        </span>
                        <span class="timeline-news__activity-comment">
                            <i class="far fa-comment-alt timeline-news__activity-icon timeline-news__cmt-icon"></i> Comment
                        </span>
                    </div>
                    <div class="separate-timeline-news"></div>
                    <form class="timeline-news__form-cmt${data.data._id} timeline-news__form-cmt" enctype="multipart/form-data" 
                        data-id="${data.data.authorId._id}" data-postid="${data.data._id}">
                        <div class="form-group-cmt">
                            <label for="input-comment${data.data._id}" class="form-label-cmt">
                                <img src="${userLogin.avatar}" alt="" class="timeline-news__footer-cmt-img">
                            </label>
                            <input type="text" class="form-control-cmt" id="input-comment${data.data._id}" name="contentCmt" placeholder="Write a comment..." required>
                            <button class="btn-submit-cmt"><i class="fas fa-paper-plane"></i></button>
                        </div>
                    </form>`;

                var aPost = aPost1 + aPost2 + aPost3 + aPost4;
                

                $('.form-edit-post-news-textarea').val('');
                $('#form-edit-post-input-link-video').val('');
                $('.wrap-show-img__input-img-edit').css('display', 'none');
                $('#form-edit-post-upload-img').val('');

                $('.modal').css('display', 'none');
                $('.wrap-form-post-news').css('display', 'block');
                $('.wrap-form-edit-post-news').css('display', 'none');

                $('.timeline-news' + data.data._id ).children(
                    '.timeline-news__heading, .timeline-news__content-text, .timeline-news__content-video, .timeline-news__content-img, .timeline-news__wrap-quantity-cmt, .separate-timeline-news, .timeline-news__show-activity, .timeline-news__form-cmt'
                ).remove();
                $('.timeline-news' + data.data._id).prepend(aPost);
                $('.timeline-news__options-list').css('display', 'none');
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    // Handle show/hide ellipsis horizontal
    $('.timeline-news__options-list').css('display', 'none');
    $(document).on('click', '.timeline-news__heading-options', function() {
        if (this.lastElementChild.style.display === 'none') {
            $(this).children('.overlay-transparent-post').css('display', 'block');
            $(this).children('.timeline-news__options-list').css('display', 'block');
        } else {
            $(this).children('.overlay-transparent-post').css('display', 'none');
            $(this).children('.timeline-news__options-list').css('display', 'none');
        }
    });

    // Handle click edit post
    var postId;
    $(document).on('click', '.timeline-news__options-item-edit', function(e) {
        $('#chk-delete-img-form-edit-post').prop('checked', true);
        postId = $(this).data('id');
        var content = $(this).data('content');
        var video = $(this).data('video');
        var image = $(this).data('image');

        $('.modal').css('display', 'flex');
        $('.wrap-form-post-news').css('display', 'none');
        $('.wrap-form-edit-post-news').css('display', 'block');

        // Hide form edit profile
        if (window.location.href.includes('/profile')) {
            $('.wrap-form-edit-prof').css('display', 'none');
        }

        if (image) {
            $('.wrap-show-img__input-img-edit').css({
                'height': '200px',
                'display': 'block',
                'margin-top': '8px',
            });
            $('.btn-close-image-form-post-edit').css('display', 'block');
            $('.textarea__img-form-post-edit').attr('src', image);
        } else {
            $('.wrap-show-img__input-img-edit').css({
                'height': '0px',
                'display': 'none',
                'margin-top': '0px',
            });
            $('.btn-close-image-form-post-edit').css('display', 'none');
            $('.textarea__img-form-post-edit').attr('src', '');
        }

        // Handle image before upload
        $('#form-edit-post-upload-img').change(function() {
            $('.wrap-show-img__input-img-edit').css({
                'height': '200px',
                'display': 'block',
                'margin-top': '8px',
            });
    
            $('.btn-close-image-form-post-edit').css('display', 'block');
            showImage(this, '.textarea__img-form-post-edit');
        });
        
        $('.btn-close-image-form-post-edit').click(function() {
            $('#chk-delete-img-form-edit-post').prop('checked', false);
            $('.btn-close-image-form-post-edit').css('display', 'none');
            $('.wrap-show-img__input-img-edit').css('display', 'none');
            $('#form-edit-post-upload-img').val('');
        });
        
        // Close form edit post
        $('.btn-close-edit-form-post').click(function() {
            $('#chk-delete-img-form-edit-post').prop('checked', true);
            $('.modal').css('display', 'none');
            $('.wrap-form-post-news').css('display', 'block');
            $('.wrap-form-edit-post-news').css('display', 'none');
        });
        
        $('.form-edit-post-news-textarea').val(content);
        $('#form-edit-post-input-link-video').val(video);
    })

    // Call API edit post when submit form edit post
    $('.form-edit-post-news').on('submit', function(event) {
        var formData = new FormData(this);
        event.preventDefault();
        editPost(postId, formData);
    })

    // Handle click delete post and call API
    $(document).on('click', '.timeline-news__options-item-delete', function(event) {
        postId = event.target.dataset.id;
        
        // Custom alert
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: [true, "Yes, delete it!"],
            dangerMode: true,
        }).then(willDelete => {
            if (willDelete) {
                deletePost(postId);
                swal("Poof! Your post has been deleted!", {icon: "success",});
            } else {
                // don't something
            }
        });
    })
});

// Load more 10 posts
var postsPage = 1;
var postsFetching = false;
var loadMore = false;

function nextPosts() {
    if (postsFetching) return;

    postsPage++;
    getPosts(postsPage);
}

function getPosts(page = 1) {
    postsFetching = true;
    $('.loading').css('display', 'block');

    $.ajax({
        url: '/post?page=' + page,
        type: 'GET',
        success: function(posts) {
            if (posts.length === 0) {loadMore = true}

            appendPosts(posts, '.app__container-timeline');
            $('.loading').css('display', 'none');
            postsFetching = false;
            $('.timeline-news__options-list').css('display', 'none');
        }
    });
}

function appendPosts(posts, selector) {
    let html = '';
    $.each(posts, function(index, post) {
        html += `
            <div class="timeline-news mb-16 timeline-news${post._id}">
                <div class="timeline-news__heading">
                    <div class="timeline-news__heading-author">
                        <img src="${post.authorId.avatar}" alt="" class="timeline-news__heading-author-img">
                        <div class="timeline-news__heading-author-wrap">
                            <a href="/profile/${post.authorId._id}" class="timeline-news__heading-author-name">${post.authorId.name}</a>
                            <span class="timeline-news__heading-time">
                                ${new Date(post.createdAt).toLocaleString('en-US', optionsTime)}<i class="fas fa-globe-americas timeline-news__heading-icon"></i>
                            </span>
                        </div>
                    </div>`;
        if (userLogin._id === post.authorId._id || userLogin.userType === 'admin') {
            html += `<div class="timeline-news__heading-options">
                        <i class="fas fa-ellipsis-h"></i>
                        
                        <div class="overlay-transparent-post"></div>
                        <ul class="timeline-news__options-list">
                            <li class="timeline-news__options-item timeline-news__options-item-edit" data-id="${post._id}"
                                    data-content="${post.content}" data-image="${post.image}" data-video="${post.video}">
                                <i class="fas fa-edit timeline-news__options-icon"></i>Edit post
                            </li>
                            <li class="timeline-news__options-item timeline-news__options-item-delete" data-id="${post._id}">
                                <i class="fas fa-trash-alt timeline-news__options-icon"></i>Delete post
                            </li>
                        </ul>
                    </div>`;
        }
            html +=
                `</div>
                <p class="timeline-news__content-text">${post.content}</p>`;
        
            if (post.video) {
                html += `<iframe class="timeline-news__content-video" width="560" height="315" src="https://www.youtube.com/embed/${post.video}" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            }
            if (post.image) {
                html += `<img src="${post.image}" alt="" class="timeline-news__content-img">`;
            }

            html += `
                <div class="timeline-news__wrap-quantity-cmt">
                    <span class="timeline-news__show-react">
                        <i class="fab fa-gratipay timeline-news__icon-show-react color-red"></i> 100
                    </span>
                    <p class="timeline-news__quantity-cmt">
                        <strong class="timeline-news__quantity">${post.comments.length}</strong> <span>Comments</span>
                    </p>
                </div>
                <div class="separate-timeline-news"></div>
                <div class="timeline-news__show-activity">
                    <span class="timeline-news__activity-liked">
                        <i class="far fa-thumbs-up timeline-news__activity-icon"></i> Like
                    </span>
                    <span class="timeline-news__activity-comment">
                        <i class="far fa-comment-alt timeline-news__activity-icon timeline-news__cmt-icon"></i> Comment
                    </span>
                </div>
                <div class="separate-timeline-news"></div>
                <form class="timeline-news__form-cmt${post._id} timeline-news__form-cmt" enctype="multipart/form-data" 
                    data-id="${userLogin._id}" data-postid="${post._id}">
                    <div class="form-group-cmt">
                        <label for="input-comment${post._id}" class="form-label-cmt">
                            <img src="${userLogin.avatar}" alt="" class="timeline-news__footer-cmt-img">
                        </label>
                        <input type="text" class="form-control-cmt" id="input-comment${post._id}" name="contentCmt" placeholder="Write a comment..." required>
                        <button class="btn-submit-cmt"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </form>`;
        if (post.comments.length > 0) {
            (post.comments.reverse()).forEach((comment) => {
                html += `
                <ul class="timeline-news__cmt-list">
                    <li class="timeline-news__cmt-item timeline-news__cmt-item${comment._id}">
                        <a href="/profile/${comment.userCommentId._id}" class="avt-user-comment-link">
                            <img src="${comment.userCommentId.avatar}" alt="" class="avt-user-comment-img">
                        </a>
                        <div class="timeline-news__cmt-body">
                            <a href="/profile/${comment.userCommentId._id}" class="name-user-comment">${comment.userCommentId.name}</a>
                            <p class="timeline-news__cmt-content">${comment.contentComment}</p>
                        </div>`;
                if (userLogin._id === comment.userCommentId._id || userLogin.userType === 'admin') {
                    html +=
                        `<div class="timeline-news__btn-options-cmt">
                            <i class="fas fa-ellipsis-h"></i>
                            <ul class="timeline-news__options-cmt-list">
                                <li class="timeline-news__options-cmt-item timeline-news__options-cmt-remove" data-cmtid="${comment._id}" data-postid="${comment.postId}">
                                    <i class="fas fa-trash timeline-news__options-icon"></i><span>Remove</span>
                                </li>
                            </ul>
                        </div>`;
                }

                html += `    
                    </li>
                </ul>`;
            })
        }

        html += `
            </div>`;
    });

    // $('.app__container-timeline').append(html);
    $(selector).append(html);
}

// Handle options comments
$(document).on('click', '.timeline-news__btn-options-cmt', function() {
    $(this).children('.timeline-news__options-cmt-list').toggle('fast');
});

// Call API comment, handle post comment
$(document).on('submit', '.timeline-news__form-cmt', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var authorId = e.target.dataset.id;
    var postId = e.target.dataset.postid;
    if ($(this).find('.form-control-cmt').val() === '') {
        // do something
    } else {
        postComment(formData, authorId, postId);
    }

    // Clear input
    $(this).find('.form-control-cmt').val('');
});

function postComment(data, authorId, postId) {
    let quantityCmt = $('.timeline-news' + postId).find('.timeline-news__quantity').text();
    $.ajax({
        url: '/comment/post/' + postId + '/author/' + authorId,
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: function(comment) {
            var html = `<ul class="timeline-news__cmt-list">
                            <li class="timeline-news__cmt-item timeline-news__cmt-item${comment._id}">
                                <a href="/profile/${comment.userCommentId._id}" class="avt-user-comment-link">
                                    <img src="${comment.userCommentId.avatar}" alt="" class="avt-user-comment-img">
                                </a>
                                <div class="timeline-news__cmt-body">
                                    <a href="/profile/${comment.userCommentId._id}" class="name-user-comment">${comment.userCommentId.name}</a>
                                    <p class="timeline-news__cmt-content">${comment.contentComment}</p>
                                </div>
                                <div class="timeline-news__btn-options-cmt">
                                    <i class="fas fa-ellipsis-h"></i>
                                    <ul class="timeline-news__options-cmt-list">
                                        <li class="timeline-news__options-cmt-item timeline-news__options-cmt-remove" data-cmtid="${comment._id}" data-postid="${comment.postId}">
                                            <i class="fas fa-trash timeline-news__options-icon"></i><span>Remove</span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>`;
            $('.timeline-news__form-cmt' + postId).after(html);

            // Update quantity comments
            $('.timeline-news' + postId).find('.timeline-news__quantity').text(++quantityCmt);
        }
    });
}

// Handle delete comment
function deleteComment(id, postId) {
    let quantityCmt = $('.timeline-news' + postId).find('.timeline-news__quantity').text();
    $.ajax({
        url: '/comment/' + id + '/delete',
        type: 'DELETE',
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
            $('.timeline-news__cmt-item' + id).remove();

            // Update quantity comments
            $('.timeline-news' + postId).find('.timeline-news__quantity').text(--quantityCmt);
        },
        error: function(error) {
            console.log(error);
        }
    })
}

$(document).on('click', '.timeline-news__options-cmt-remove', function() {
    var commentId = $(this).data('cmtid');
    var postId = $(this).data('postid');

    // Alert
    swal({
        text: 'Are you sure you want to delete this comment?',
        buttons: [true, 'Yes, delete it!'],
        dangerMode: true,
    }).then(willDelete => {
        if (willDelete) {
            deleteComment(commentId, postId);
        } else {
            // don't something
        }
    });
});

// Show posts in profile page
var postsPageProf = 1;
var postsFetchingProf = false;
var loadMoreProf = false;
var url = window.location.pathname;
var profileId = url.substring(url.lastIndexOf('/') + 1); // get id profile in url

function nextPostsProfile() {
    if (postsFetchingProf) return;

    postsPageProf++;
    getPostsProfile(postsPageProf);
}

function getPostsProfile(page = 1) {
    postsFetchingProf = true;
    $('.loading').css('display', 'block');

    $.ajax({
        url: '/profile/' + profileId + '/post?page=' + page,
        type: 'GET',
        success: function(posts) {
            if (posts.length === 0) {loadMoreProf = true}

            appendPosts(posts, '.prof-timeline__container');
            $('.loading').css('display', 'none');
            postsFetchingProf = false;
            $('.timeline-news__options-list').css('display', 'none');
        }
    });
}

$(document).ready(function() {
    if (window.location.href.includes('/profile')) {
        getPostsProfile();

        $(window).scroll(function() {
            var scrollTopProf = $(this).scrollTop();
            var heightViewPort = $(this).height();
            var heightTimelineProf = $(document).height();
        
            if ((scrollTopProf + heightViewPort) >= (heightTimelineProf - 40)) {
                !loadMoreProf && nextPostsProfile();
            }
        });
    }
    else if (new URL(window.location.href).pathname === '/') {
        getPosts();

        $(window).scroll(function() {
            var scrollTop = $(this).scrollTop(); //5816.7998046875
            var heightAppContainer = $(this).height(); // 706.4
            var heightTimeline = $(document).height(); // 6459.4
        
            if ((scrollTop + heightAppContainer) >= (heightTimeline - 40)) {
                !loadMore && nextPosts();
            }
        });
    }
});

// Handle event show/hide input search
$('.list-students__heading-wrap-icon').click(function () {
    $('.list-students__search').toggle('400');
});

// Handle search name student
$('.list-students__search-input').keyup(function() {
    let filter = $(this).val().toUpperCase();
    let name;
    var items = $('.list-students__body-item');

    for(let i = 0; i < items.length; i++) {
        name = items[i].querySelector('.list-students__body-item-name');
        if (name.innerHTML.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = '';
        } else {
            items[i].style.display = 'none';
        }
    }
});

// Auto show/hide icon new notification
const iconNew = document.querySelector('.box-notification__heading-img');

if (iconNew) {
    iconNew.style.visibility = 'visible';
    iconNew.style.opacity = '1';
    
    setInterval(() => {
        if (iconNew.style.visibility === 'visible') {
            iconNew.style.visibility = 'hidden';
            iconNew.style.opacity = '0';
        } else {
            iconNew.style.visibility = 'visible';
            iconNew.style.opacity = '1';
        }
    }, 600);
}

// Notification page
if (new URL(window.location.href).pathname === '/notification' || new URL(window.location.href).pathname === '/notification/') {
    // Pagination
    $('#pagination-container').pagination({
        className: 'paginationjs-theme-blue',
        pageSize: 10,
        showGoInput: true,
        showGoButton: true,
        autoHidePrevious: true,
        autoHideNext: true,
        dataSource: function(done) {
            $.ajax({
                url: '/notification/display',
                success: (notifications) => done(notifications),
            })
        },
        callback: function(notifications, pagination) {
            renderNotifications(notifications);
        }
    });
}

function renderNotifications(data) {
    if (data.length == 0) {
        $('.container__notify-list').html('<p class="not-found-notification">Không có thông báo nào được tìm thấy!!!</p>');
    } else {
        var html = data.map((current, index) => {
            var timePost = new Date(current.createdAt).toLocaleDateString('en-US');
            let ofDepartment = '';
            let description;
    
            // Check author có chọn chuyên mục mình phụ trách hay không? Nếu không chọn thì lấy name của author
            if (!current.ofDepartment) {
                ofDepartment = current.authorId.name;
            } else {
                ofDepartment = current.ofDepartment;
            }
    
            // Check nếu author có upload file thì thay đổi description
            if (current.files.length > 0) {
                description = 'Xem chi tiết trong các file đính kèm';
            } else {
                description = current.title;
            }
    
            return `<li class="container__notify-item">
                        <p class="container__notify-item-title">${current.title}</p>
                        <p class="container__notify-item-desc">${description}</p>
                        <div class="container__notify-item-foot">
                            <a href="/notification/detail/${current._id}" class="container__notify-link-detail">Chi tiết thông báo</a>
                            <span class="container__notify-department-name">
                                <i>${ofDepartment}</i><span class="container__notify-item-time"> | Ngày đăng ${timePost}</span>
                            </span>
                        </div>
                    </li>`;
        });
    
        $('.container__notify-list').html(html.join(''));
    }
}

// Handle filter department
$('#form-filter-department').submit((e) => {
    e.preventDefault();

    $('#pagination-container').pagination({
        className: 'paginationjs-theme-blue',
        pageSize: 10,
        showGoInput: true,
        showGoButton: true,
        autoHidePrevious: true,
        autoHideNext: true,
        dataSource: function(done) {
            $.ajax({
                type: 'GET',
                url: '/notification/display?filterDepartment=' + $('#filter-department').val(),
                success: (notifications) => done(notifications),
            })
        },
        callback: function(notifications, pagination) {
            renderNotifications(notifications);
        }
    });
});

// Handle search notification by name
$('.body-notify-input-search').keyup(function() {
    let filter = $(this).val().toUpperCase();
    let name;
    var items = $('.container__notify-item');

    for(let i = 0; i < items.length; i++) {
        name = items[i].querySelector('.container__notify-item-title');
        if (name.innerHTML.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = '';
        } else {
            items[i].style.display = 'none';
        }
    }
});

// Show file name when choose file
var inputFileNotification = document.getElementById('notify-input-file');

if (inputFileNotification) {
    inputFileNotification.onchange = function() {
        let html = '';
        const n = this.files.length;
        if (n > 1) {
            for (let i = 0; i < n; i++) {
                html += `<li class="item-file-upload">${this.files[i].name}</li>`;
            }
        } else {
            html = '';
        }

        $('.list-file-upload').html(html);
    }
}

// Delete notification
$('.btn.btn-delete-notification').click(e => {
    e.preventDefault();
    const id = e.target.id; // get value in attr id
    let totalNotify = $('.total-accounts-text .text-danger').html();

    // Custom alert
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this notification!",
        icon: "warning",
        buttons: [true, "Yes, delete it!"],
        dangerMode: true,
    }).then(willDelete => {
        if (willDelete) {
            $.ajax({
                type: 'DELETE',
                url: '/notification/me/delete/' + id,
                success: function(response) {
                    $('#' + id).parent().parent().remove();
                    $('.total-accounts-text .text-danger').html(totalNotify - 1);
                }
            })
            swal("Poof! Your notification has been deleted!", {icon: "success",});
        } else {
            // don't something
        }
    });
})

const configCKE = {
    uiColor: '#2b81f3',
	toolbar: [
		{ name: 'document', items: ['Source', '-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates'] },
		{ name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
		{ name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
		{ name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
		// '/',
		{ name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
		{ name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
		{ name: 'links', items: ['Link', 'Unlink'] },
		{ name: 'insert', items: ['Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
		'/',
		{ name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
		{ name: 'colors', items: ['TextColor', 'BGColor'] },
		{ name: 'tools', items: ['Maximize', 'ShowBlocks'] },
	],
};

// Using CKEditor
if (new URL(window.location.href).pathname.includes('/notification/post')) {
    // Using CKEditor
    CKEDITOR.replace('textarea-notify', configCKE);
}

// Đổ data cũ vào input trước khi edit
if (window.location.href.includes('/notification/me/edit/')) {
    const id = new URL(window.location.href).pathname.split('/')[new URL(window.location.href).pathname.split('/').length - 1];
    $(document).ready(() => {
        $.ajax({
            type: 'GET',
            url: '/notification/me/edit/ajax/' + id,
            success: function(data) {
                $('#ofDepartmentEdit option').each((index, element) => {
                    if (element.value === data.ofDepartment) {
                        element.selected = true;
                    }
                })
                
                $('#notify-input-text-edit').val(data.title);
                CKEDITOR.replace('textarea-notify-edit', configCKE);
                CKEDITOR.instances['textarea-notify-edit'].setData(data.content);

                if (data.files.length > 0) {
                    appendRadiobtn();
                    $('#notify-input-file-edit').prop('required', true);
                }

                $('input[type=radio][name=radioEdit]').change(function() {

                    if (this.value === 'upload') {
                        $('#notify-input-file-edit').attr('disabled', false);
                        $('#notify-input-file-edit').prop('required', true);
                    } else {
                        $('#notify-input-file-edit').attr('disabled', true);
                    }
                });
            }
        })
    });

    function appendRadiobtn() {
        var html = `<div class="form-group-edit-notification">
                        <input type="radio" class="form-control-notify" id="notify-radio-edit" name="radioEdit" value="upload" required checked>
                        <label for="notify-radio-edit" class="form-label-notify-edit">Change files</label>
                    </div>
                    <div class="form-group-edit-notification">
                        <input type="radio" class="form-control-notify" id="notify-radio-edit-1" name="radioEdit" value="unchange">
                        <label for="notify-radio-edit-1" class="form-label-notify-edit">Preserve the old files</label>
                    </div>
                    <div class="form-group-edit-notification">
                        <input type="radio" class="form-control-notify" id="notify-radio-edit-2" name="radioEdit" value="deleteAll">
                        <label for="notify-radio-edit-2" class="form-label-notify-edit">Delete all old files</label>
                    </div>`;
        $('.wrap-form-group-edit-notification').html(html);
    }

    // Show file name when choose file in edit notification page
    var editFileNotification = document.getElementById('notify-input-file-edit');

    if (editFileNotification) {
        editFileNotification.onchange = function() {
            let html = '';
            const n = this.files.length;
            if (n > 1) {
                for (let i = 0; i < n; i++) {
                    html += `<li class="item-file-upload-edit">${this.files[i].name}</li>`;
                }
            } else {
                html = '';
            }

            $('.list-file-upload-edit').html(html);
        }
    }
}

// Make connection with socket.io
const socket = io.connect();

const btnPostNotify = document.querySelector('.btn.btn-submit-form-notify');

if (btnPostNotify) {
    btnPostNotify.addEventListener('click', (e) => {
        socket.emit('post', {});
    });
}

socket.on('post', (data) => {
    var html = `<div class="message-real-time">
                    ${data.notification.ofDepartment} vừa đăng một thông báo:
                    <a href="/notification/detail/${data.notification._id}"> ${data.notification.title}</a>
                </div>`;
    $('.wrap-message-real-time').html(html);
})

// Handle icon header: home, notifications, profile
var url = new URL(window.location.href);
var iconInHeader = document.querySelectorAll('.wrap-icon-home-header');

if (url.pathname === '/') {
    iconInHeader[0].classList.add('active');
    iconInHeader[1].classList.remove('active');
    iconInHeader[2].classList.remove('active');
} else if (url.pathname.includes('/profile')) {
    iconInHeader[0].classList.remove('active');
    iconInHeader[1].classList.add('active');
    iconInHeader[2].classList.remove('active');
} else if (url.pathname === '/notification') {
    iconInHeader[0].classList.remove('active');
    iconInHeader[1].classList.remove('active');
    iconInHeader[2].classList.add('active');
} else if (url.pathname === '/auth/login') {
    // dont something
} else {
    iconInHeader[0].classList.remove('active');
    iconInHeader[1].classList.remove('active');
    iconInHeader[2].classList.remove('active');
}

// Validate edit profile form
var nameProfile = document.getElementById('input-edit-name-prof');
var groupProfile = document.getElementById('input-edit-group-prof');
var facultyProfile = document.getElementById('input-edit-faculty-prof');
var formEditProfile = document.querySelector('.form-edit-prof');
var btnSubmitEditProfile = document.querySelector('.btn-submit-edit-prof');

if (formEditProfile) {
    nameProfile.onkeyup = () => {
        if (nameProfile.value === '' || nameProfile.value.length < 4) {
            btnSubmitEditProfile.classList.add('disabled');
            btnSubmitEditProfile.setAttribute('disabled', 'disabled');
        } else {
            btnSubmitEditProfile.classList.remove('disabled');
            btnSubmitEditProfile.removeAttribute('disabled');
        }
    }

    groupProfile.onkeyup = () => {
        if (groupProfile.value === '') {
            btnSubmitEditProfile.classList.add('disabled');
            btnSubmitEditProfile.setAttribute('disabled', 'disabled');
        } else {
            btnSubmitEditProfile.classList.remove('disabled');
            btnSubmitEditProfile.removeAttribute('disabled');
        }
    }

    facultyProfile.onkeyup = () => {
        if (facultyProfile.value === '') {
            btnSubmitEditProfile.classList.add('disabled');
            btnSubmitEditProfile.setAttribute('disabled', 'disabled');
        } else {
            btnSubmitEditProfile.classList.remove('disabled');
            btnSubmitEditProfile.removeAttribute('disabled');
        }
    }
}

// Validate post news form
var formPostNews = document.querySelector('.form-post-news');
var textareaPostNews = document.getElementById('textareaCreate');
var btnSubmitPostNews = document.querySelector('.btn-submit-form-post-news');

if (formPostNews) {
    if (textareaPostNews.value === '') {
        btnSubmitPostNews.classList.add('disabled');
        btnSubmitPostNews.setAttribute('disabled', 'disabled');
    }

    textareaPostNews.onkeyup = () => {
        if (textareaPostNews.value === '') {
            btnSubmitPostNews.classList.add('disabled');
            btnSubmitPostNews.setAttribute('disabled', 'disabled');
        } else {
            btnSubmitPostNews.classList.remove('disabled');
            btnSubmitPostNews.removeAttribute('disabled');
        }
    }
}

// Validate form edit post news
var formEditPostNews = document.querySelector('.form-edit-post-news');
var textareaEditPostNews = document.getElementById('textareaEdit');
var videoEditPostNews = document.getElementById('form-edit-post-input-link-video')
var btnSubmitEditPostNews = document.querySelector('.form-edit-post-news .btn-submit-form-post-news');

if (formEditPostNews) {
    textareaEditPostNews.onkeyup = () => {
        if (textareaEditPostNews.value === '') {
            btnSubmitEditPostNews.classList.add('disabled');
            btnSubmitEditPostNews.setAttribute('disabled', 'disabled');
        } else {
            btnSubmitEditPostNews.classList.remove('disabled');
            btnSubmitEditPostNews.removeAttribute('disabled');
        }
    }
}

// Validate form post notification
var formPostNotification = document.getElementById('form-post-notification');
var selectPostNotification = document.getElementById('ofDepartment');
var titlePostNotification = document.getElementById('notify-input-text');

if (formPostNotification) {
    btnPostNotify.classList.add('disabled');
    btnPostNotify.setAttribute('disabled', 'disabled');

    selectPostNotification.onmouseup = () => {
        if (selectPostNotification.value === '') {
            btnPostNotify.classList.add('disabled');
            btnPostNotify.setAttribute('disabled', 'disabled');
        } else if (titlePostNotification.value === '') {
            btnPostNotify.classList.add('disabled');
            btnPostNotify.setAttribute('disabled', 'disabled');
        } else {
            btnPostNotify.classList.remove('disabled');
            btnPostNotify.removeAttribute('disabled');
        }
    }

    titlePostNotification.onkeyup = () => {
        if (selectPostNotification.value === '') {
            btnPostNotify.classList.add('disabled');
            btnPostNotify.setAttribute('disabled', 'disabled');
        } else if (titlePostNotification.value === '') {
            btnPostNotify.classList.add('disabled');
            btnPostNotify.setAttribute('disabled', 'disabled');
        } else {
            btnPostNotify.classList.remove('disabled');
            btnPostNotify.removeAttribute('disabled');
        }
    }
}

// Validate form edit notification
var formEditNotification = document.getElementById('form-edit-notification');
var selectEditNotification = document.getElementById('ofDepartmentEdit');
var titleEditNotification = document.getElementById('notify-input-text-edit');
var btnEditNotify = document.querySelector('.btn.btn-submit-form-edit-notify');

if (formEditNotification) {
    selectEditNotification.onmouseup = () => {
        if (selectEditNotification.value === '') {
            btnEditNotify.classList.add('disabled');
            btnEditNotify.setAttribute('disabled', 'disabled');
        } else if (titleEditNotification.value === '') {
            btnEditNotify.classList.add('disabled');
            btnEditNotify.setAttribute('disabled', 'disabled');
        } else {
            btnEditNotify.classList.remove('disabled');
            btnEditNotify.removeAttribute('disabled');
        }
    }

    titleEditNotification.onkeyup = () => {
        if (selectEditNotification.value === '') {
            btnEditNotify.classList.add('disabled');
            btnEditNotify.setAttribute('disabled', 'disabled');
        } else if (titleEditNotification.value === '') {
            btnEditNotify.classList.add('disabled');
            btnEditNotify.setAttribute('disabled', 'disabled');
        } else {
            btnEditNotify.classList.remove('disabled');
            btnEditNotify.removeAttribute('disabled');
        }
    }
}
