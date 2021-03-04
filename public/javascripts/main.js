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
    
            if (usernameFormCreateAccount.value === '') {
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
            } else {
                error = '';
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
                error = 'Current password does not match';
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
    }

    // When click btn edit profile, will show modal
    var btnEditProfile = document.querySelector('.btn-edit-prof');
    var modal = document.querySelector('.modal');
    var btnCloseEditProf = document.querySelector('.btn-close-edit-prof');

    if (btnEditProfile) {
        btnEditProfile.onclick = function() {
            modal.style.display = 'flex';
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
            var profileInfo = $('.profile-info');
            e.preventDefault();
            var formData = new FormData(this);
    
            $.ajax({
                url: '/profile/' + userId + '/edit',
                type: 'PUT',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    var profile = `
                            <ul class="profile-info-list">
                                <li class="profile-info-item">
                                    <span class="profile-info-title">Name: </span>${data.data.name}
                                </li>
                                <li class="profile-info-item">
                                    <span class="profile-info-title">Email: </span>${profileWorkFlow.email}
                                </li>
                            </ul>
                            <ul class="profile-info-list">
                                <li class="profile-info-item">
                                    <span class="profile-info-title">Group: </span>${data.data.group}
                                </li>
                                <li class="profile-info-item">
                                    <span class="profile-info-title">Faculty: </span>${data.data.faculty}
                                </li>
                            </ul>`;
            
                    // Update all name in page
                    $('.heading__navigation-user-name').html(data.data.name);
                    $('.header__nav-text-name').html(data.data.name);
                    $('.profile-name-heading').html(data.data.name);

                    // Update all avatar in page
                    $('.header__nav-avt.header__navigation-avt').attr('src', data.data.avatar);
                    $('.header__nav-avt').attr('src', data.data.avatar);
                    $('.profile-image').attr('src', data.data.avatar);
        
                    profileInfo.html(profile);
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
                    var timePost = new Date(data.dataPost.createdAt).toLocaleString();
                    var aPost1 = `
                        <div class="timeline-news mb-16 timeline-news${data.dataPost._id}">
                            <div class="timeline-news__heading">
                                <div class="timeline-news__heading-author">
                                    <img src="${data.dataAuthor.avatar}" alt="" class="timeline-news__heading-author-img">
                                    <div class="timeline-news__heading-author-wrap">
                                        <a href="" class="timeline-news__heading-author-name">${data.dataAuthor.name}</a>
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
                                    <strong class="timeline-news__quantity">100</strong> <span>Comments</span>
                                </p>
                            </div>
                            <div class="separate-timeline-news"></div>
                            <div class="timeline-news__show-activity">
                                <span class="timeline-news__activity-liked">
                                    <i class="far fa-thumbs-up timeline-news__activity-icon"></i> Liked
                                </span>
                                <span class="timeline-news__activity-comment">
                                    <i class="far fa-comment-alt timeline-news__activity-icon timeline-news__cmt-icon"></i> Comment
                                </span>
                            </div>
                            <div class="separate-timeline-news"></div>
                            <form action="" class="timeline-news__form-cmt">
                                <div class="form-group-cmt">
                                    <label for="input-comment" class="form-label-cmt">
                                        <img src="/uploads/corgi.jpg" alt="" class="timeline-news__footer-cmt-img">
                                    </label>
                                    <input type="text" class="form-control-cmt" id="input-comment" placeholder="Write a comment...">
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
                console.log(data);
                var timePost = new Date(data.data.createdAt).toLocaleString();
                var aPost1 = `
                    <div class="timeline-news__heading">
                        <div class="timeline-news__heading-author">
                            <img src="${data.data.authorId.avatar}" alt="" class="timeline-news__heading-author-img">
                            <div class="timeline-news__heading-author-wrap">
                                <a href="" class="timeline-news__heading-author-name">${data.data.authorId.name}</a>
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
                            <strong class="timeline-news__quantity">100</strong> <span>Comments</span>
                        </p>
                    </div>
                    <div class="separate-timeline-news"></div>
                    <div class="timeline-news__show-activity">
                        <span class="timeline-news__activity-liked">
                            <i class="far fa-thumbs-up timeline-news__activity-icon"></i> Liked
                        </span>
                        <span class="timeline-news__activity-comment">
                            <i class="far fa-comment-alt timeline-news__activity-icon timeline-news__cmt-icon"></i> Comment
                        </span>
                    </div>
                    <div class="separate-timeline-news"></div>
                    <form action="" class="timeline-news__form-cmt">
                        <div class="form-group-cmt">
                            <label for="input-comment" class="form-label-cmt">
                                <img src="/uploads/corgi.jpg" alt="" class="timeline-news__footer-cmt-img">
                            </label>
                            <input type="text" class="form-control-cmt" id="input-comment" placeholder="Write a comment...">
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

                $('.timeline-news' + data.data._id).html(aPost);
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
        postId = $(this).data('id');
        var content = $(this).data('content');
        var video = $(this).data('video');
        var image = $(this).data('image');

        $('.modal').css('display', 'flex');
        $('.wrap-form-post-news').css('display', 'none');
        $('.wrap-form-edit-post-news').css('display', 'block');

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
            $('.btn-close-image-form-post-edit').css('display', 'none');
            $('.wrap-show-img__input-img-edit').css('display', 'none');
            $('#form-edit-post-upload-img').val('');
        });
        
        // Close form edit post
        $('.btn-close-edit-form-post').click(function() {
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
        deletePost(postId);
    })
});