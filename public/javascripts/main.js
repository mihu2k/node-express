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
    function showImage(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('.textarea__img-form-post-news').attr('src', e.target.result);
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
        showImage(this);
    });

    // Handle btn close image
    if (btnCloseImageFormPost) {
        btnCloseImageFormPost.click(function() {
            btnCloseImageFormPost.css('display', 'none');
            $('.wrap-show-img__input-img').css('display', 'none');
            $('#form-post-news-upload-img').val('');
        });
    }
});