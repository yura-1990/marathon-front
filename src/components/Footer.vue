<script setup lang="ts">

</script>

<template>
  <footer class="prt-bgimage-yes bg-footer prt-bg bg-base-dark overflow-hidden clearfix"
          style="background-image: url('/assets/images/flag-2.webp'); background-size: cover; background-position: center; background-repeat: no-repeat"
  >
    <div class="prt-row-wrapper-bg-layer bg-base-dark prt-bg-layer"></div>
    <div class="container position-relative">
      <div class="first-footer">
        <div class="row">
          <div class="col-lg-9 align-self-center">
            <div class="footer-title">
              <a href="/" title="Raccer">
                <img id="logo-img" width="150px" class="img-fluid  auto_size" src="/assets/images/logo_itog.png" alt="logo-img">
              </a>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="circular-fid-and-text-box">
              <div class="circular-main">
                <div class="prt-rotating-text position-relative">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 200 200">
                    <defs>
                      <path d="M0, 100a100, 100 0 1, 0 200, 0a100, 100 0 1, 0 -200, 0" id="txt-path-1"></path>
                    </defs>
                    <text>
                      <textPath startOffset="0" xlink:href="#txt-path">
                        Road running with us.</textPath>
                    </text>
                  </svg>
                  <div class="circular">
                    <div class="prt_prettyphoto">
                      <img id="logo-img" width="90px" class="footer-label" src="/assets/images/logo_itog.png" alt="logo-img">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="second-footer">
        <div class="row">
          <div class="col-xs-12 col-md-6 col-lg-4 widget-area">
            <div class="widget newsletter_widget clearfix">
              <h3 class="widget-title">{{ $t('leave_us_your_email') }}</h3>
              <form id="subscribe-form"  method="post" action="#" data-mailchimp="true">
                <div class="d-flex align-items-center">
                  <input type="email" name="email" :placeholder="$t('get_news_updates')">
                  <button class="text-black h3 rounded-pill" type="submit">
                    <i class="fa-thin fa-paper-plane"></i>
                  </button>
                </div>

                <p class="cookies">
                  <input type="checkbox" name="cookies-consent" id="cookies-consent1">
                  <label for="cookies-consent1"></label>
                  {{ $t('i_agree_to_terms') }}
                </p>
              </form>
            </div>
          </div>
          <div class="col-xs-12 col-md-6 col-lg-4 widget-area">
            <div class="widget widget_nav_menu clearfix">
              <h3 class="widget-title">{{ $t('quick_links') }}</h3>
              <ul id="menu-footer-service-link" class="menu">
                <li><a href="/">{{ $t('home') }}</a></li>
                <li><a  href="/events">{{ $t('events') }}</a></li>
                <li><a href="/about-us">{{ $t('about_us') }}</a></li>
                <li><a class="text-nowrap" href="/contact-us">{{ $t('contact_us') }}</a></li>
              </ul>
            </div>
          </div>
          <div class="col-xs-12 col-md-12 col-lg-4 widget-area">
            <div class="widget widget-address clearfix">
              <h3 class="widget-title">{{ $t('contact_info') }}</h3>
              <div class="">
                <p>{{ $t('address1') }}</p>
                <div class="pt-20">
                  <a href="mailto:info@example.com" class="email-info">info.support@gmail.com</a>
                  <div class="tel-number">
                    <a href="tel:+998 00 000 00 00">+998 00 000 00 00</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-footer-text">
        <div class="container p-0">
          <div class="row">
            <div class="col-md-12">
              <div class="d-lg-flex align-items-center justify-content-between">
                <div class="copyright">
                  <div class="d-sm-flex align-items-center justify-content-center position-relative">
                    <div class="cpy-text">
                      © 2024 <a href="/"> Road running</a>.
                      {{ $t('all_rights_reserved') }}</div>
                  </div>
                </div>
                <div>
                  <div class="footer-social-links-wrapper">
                    <ul class="footer-social-icons">
                      <li class="footer-social-link-items">
                        <a href="https://www.facebook.com/preyantechnosys19" target="_blank" class="footer-link">Facebook</a>
                      </li>
                      <li class="footer-social-link-items">
                        <a href="https://twitter.com/PreyanTechnosys" target="_blank" class="footer-link">Twitter</a>
                      </li>
                      <li class="footer-social-link-items">
                        <a href="https://www.linkedin.com/in/preyan-technosys-pvt-ltd/" target="_blank" class="footer-link">LinkedIn</a>
                      </li>
                      <li class="footer-social-link-items">
                        <a href="https://www.instagram.com/preyan_technosys/" target="_blank" class="footer-link">Instagram</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>