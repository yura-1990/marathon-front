<script setup lang="ts">
import { useMarathonStore } from '@/stores/marathons'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const singleMarathon = useMarathonStore()
const { marathon } = storeToRefs(singleMarathon)
const route = useRoute()
const {locale} = useI18n()

onMounted(async ()=>{
  await singleMarathon.getSingleMarathon(route.params.id, locale.value)
})


watch(()=>locale.value, async (language)=>{
  await singleMarathon.getSingleMarathon(route.params.id, language)
})
</script>

<template>
<div>
  <div class="prt-page-title-row blog-single style2" :style="`
      background-image: url(http://api.roadrunning.uz/storage/${marathon?.image});
      background-size: cover;
      background-position: center center;
      background-attachment: fixed;
      background-repeat: no-repeat;
    `">
    <div class="prt-page-title-row-inner ">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12">
            <div class="prt-page-title-row-heading">
              <div class="prt-page-title-link d-flex align-items-center">
                <a href="#">{{ $t('register') }}</a>
                <div class="post-category">
                  <i class="ti ti-alarm-clock" aria-hidden="true"></i>
                  <span>2022-06-25, 03:pm</span>
                </div>
                <div class="post-date">
                  <i class="fa-light fa-user"></i>
                  <span> 5 users</span>
                </div>
              </div>
              <div class="prt-page-title-details">

              </div>
              <div class="page-title-heading">
                <h2 class="title">{{ marathon.name }}</h2>
                <p class="text-white ">{{ marathon.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="site-main">

    <!-- prt-blog-single -->
    <div class="prt-row blog-details-section clearfix">
      <div class="container">
        <!-- row -->
        <div class="row">
          <div class="col-lg-8">
            <div class="prt-blog-single-content">
              <div class="entry-content">
                <div class="blog-single-title">
                  <h2>Racing is also more than fastest cars driving around in circles. Together this guide to the wide world of motorsport</h2>
                  <p>Raccer love to talk about it, corporations love to sponsor it, and most men with driver’s licenses
                    think they can do it. Racing has been a part of car culture almost since the car was invented; it’s
                    part spectacle, part sport, and part technological showcase. Racing is also more than fast cars driving around in circles, this guide to the wide world of sport.
                  </p>
                </div>
                <blockquote>
                  <div class="qoute-text">Mollis et pretium ut ultrices at sit scelerisque. Id proin ornare volutpat amet
                    et est. Pretium urna egestas a interdum. Sapien vitae eget enim viverra pretium massa sollicitudin convallis
                    ultrices. </div>
                </blockquote>
                <div class="row pt-30">
                  <div class="col-lg-6">
                    <img class="img-fluid border-rad_20" src="/assets/images/blog/blog-14-415x322.webp" alt="img">
                  </div>
                  <div class="col-lg-6 res-991-mt-30">
                    <div class="blog-single-title">
                      <h3>Art of Mountain Bike Racing</h3>
                      <p>These topics could include choosing the right
                        bike, essential gear, training tips, and then finding
                        local races to participate
                      </p>
                    </div>
                    <ul class="prt-list style2">
                      <li class="prt-list-item">
                        <div></div>
                        <span>Creating electric atmosphere unlike other sporting event</span>
                      </li>
                      <li class="prt-list-item">
                        <div></div>
                        <span>Explore racing series and formats</span>
                      </li>
                      <li class="prt-list-item">
                        <div></div>
                        <span>Get chance to tour in an exotic supercar</span>
                      </li>
                      <li class="prt-list-item">
                        <div></div>
                        <span>Carries the highest of quality craftsmanship</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="social-media-block mt-25">
                  <div class="prt_tag_lists prt-tags-links">
                    <span class="prt-tags-links-title">Tags:</span>
                    <span class="prt-tags-links"><a href="#">Motor racing</a><a href="#">racing</a></span>
                  </div>
                  <div class="prt-social-share-wrapper">
                    <span class="prt-tags-links-title mt_10">Share:</span>
                    <ul class="social-icons list-inline">
                      <li class="facebook"><a href="https://www.facebook.com/themetechMount18" rel="noopener" aria-label="facebook">Facebook</a></li>
                      <li class="twitter"><a href="https://twitter.com/themetechmount" rel="noopener" aria-label="twitter">Twitter</a></li>
                      <li class="instagram"><a href="https://www.instagram.com/preyan_technosys/" rel="noopener" aria-label="instagram">Instagram</a></li>
                      <li class="linkedin"><a href="https://www.linkedin.com/company/themetech-mount/" rel="noopener" aria-label="linkedin">Linkedin</a></li>
                    </ul>
                  </div>
                </div>
                <div class="prt-blog-classic-box-comment_1">
                  <h3 class="fs-34">Leave A Comment</h3>
                  <p>Your email address will not be published.</p>
                  <div id="comments_1" class="comments-area_1">
                    <div class="comment-respond">
                      <form action="#" method="post" id="commentform" class="comment-form_1">
                        <div class="row">
                          <div class="col-md-6">
                            <p class="comment-form-author">
                              <input id="author" placeholder="Entet your name..." name="author" type="email" value="" size="30" aria-required="true">
                            </p>
                          </div>
                          <div class="col-md-6">
                            <p class="comment-form-email">
                              <input id="email" placeholder="Entet your email address..." name="email" type="email" value="" size="30" aria-required="true">
                            </p>
                          </div>
                          <div class="col-md-12">
                            <p class="comment-form-comment">
                              <textarea id="comment" placeholder="typr here..." name="comment" cols="45" rows="4" aria-required="true"></textarea>
                            </p>
                          </div>
                          <p class="form-submit mt-25 mb-0">
                            <button class="prt-btn prt-btn-size-lg prt-btn-shape-rounded
                                                            prt-btn-style-fill prt-btn-color-skincolor w-100" type="submit">Send message</button>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 prt-sticky-column">
            <div class="p-0">
              <div class="featured-icon-box icon-align-top-content style6">
                <div class="featured-icon">
                  <div class="prt-icon prt-icon_element-color-skincolor prt-icon_element-size-md">
                    <i class="flaticon-champion"></i>
                  </div>
                </div>
                <div class="featured-content">
                  <div class="featured-title">
                    <h3>Actionable tips from top</h3>
                  </div>
                  <div class="featured-desc">
                    <p>Providing overview of championship, the different classes of bikes, key
                      rivalries & preview of the upcoming season. It could also touch on</p>
                  </div>
                </div>
                <a class="prt-btn prt-btn-size-lg prt-btn-shape-rounded prt-btn-style-border prt-btn-color-whitecolor w-100 mt-20
                                    " href="service-details.html">View more services!</a>
              </div>
            </div>
          </div>
        </div><!-- row end -->
      </div>
    </div>
    <!-- prt-blog-single end-->

  </div>
</div>
</template>

<style scoped>

</style>