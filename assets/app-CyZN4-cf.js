var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _config, _elements, _giftCssClassName, _Gifts_instances, giftToTemplate_fn, giftsToTemplate_fn, getPicture_fn, getStyleModifier_fn, getTotalSuperpowers_fn, addClickHandlers_fn, clickHandler_fn, _config2, _elements2, _Tabs_instances, addClickHandler_fn, clickHandler_fn2, toggleActiveItem_fn, switchActiveTab_fn, _config3, _elements3, _Modal_instances, addClickHandler_fn2, clickHandler_fn3, metaToTemplate_fn, superpowersToTemplate_fn, superpowerToTemplate_fn, ratingToTemplate_fn, _config4, _elements4, _Slider_instances, addClickHandlers_fn2, addControlStateHandler_fn, addResizeHandler_fn, clickHandlerLeft_fn, clickHandlerRight_fn, controlStateHandler_fn, resizeHandler_fn, disableControls_fn, scrollToLeft_fn, scrollToRight_fn, scrollReset_fn, sliderComputedStyle_get, sliderPaddingLeft_get, sliderPaddingRight_get, sliderOffsetWidth_get, scrollWidth_get, itemsScrollLeft_get, itemsScrollLeft_set, scrollOverflow_get, amountOfClicks_get, scrollPadding_get, isScrolledToLeft_get, isScrolledToRight_get, _config5, _elements5, _Burger_instances, addClickHandlers_fn3, clickBurgerHandler_fn, clickCloseHandler_fn, clickMenuHandler_fn, show_fn, hide_fn, _config6, _elements6, _interval, _seconds, _Countdown_instances, start_fn, update_fn, _config7, _elements7, _offset, _Up_instances, addScrollHandler_fn, scrollHandler_fn;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
class Gifts {
  /**
   * @param {GiftConfig} config
   */
  constructor({
    bestAmount,
    categories,
    cssSelectors,
    onClickGift
  }) {
    __privateAdd(this, _Gifts_instances);
    /**
     * @type {Gift[]}
     */
    __publicField(this, "all", []);
    /**
     * @type {GiftConfig}
     */
    __privateAdd(this, _config);
    /**
     * @type {GiftElements}
     */
    __privateAdd(this, _elements);
    /**
     * @type {string}
     */
    __privateAdd(this, _giftCssClassName, "card");
    __privateSet(this, _config, {
      bestAmount,
      categories,
      cssSelectors,
      onClickGift
    });
    __privateSet(this, _elements, {
      all: document.querySelector(cssSelectors.all),
      best: document.querySelector(cssSelectors.best)
    });
  }
  async load() {
    const response = await fetch("gifts.json");
    this.all = await response.json();
    this.insertBest();
    this.insertAll();
    __privateMethod(this, _Gifts_instances, addClickHandlers_fn).call(this);
  }
  insertBest(isRandom = true) {
    if (__privateGet(this, _elements).best === null) {
      return;
    }
    const gifts = (isRandom ? this.random : this.best).slice(0, __privateGet(this, _config).bestAmount);
    __privateGet(this, _elements).best.innerHTML = __privateMethod(this, _Gifts_instances, giftsToTemplate_fn).call(this, gifts);
  }
  /**
   * @param {GiftCategoryAlias} category
   */
  insertAll(category = __privateGet(this, _config).categories.all.alias) {
    if (__privateGet(this, _elements).all === null) {
      return;
    }
    switch (category) {
      case __privateGet(this, _config).categories.all.alias:
        __privateGet(this, _elements).all.innerHTML = __privateMethod(this, _Gifts_instances, giftsToTemplate_fn).call(this, this.all);
        break;
      case __privateGet(this, _config).categories.work.alias:
        __privateGet(this, _elements).all.innerHTML = __privateMethod(this, _Gifts_instances, giftsToTemplate_fn).call(this, this.work);
        break;
      case __privateGet(this, _config).categories.health.alias:
        __privateGet(this, _elements).all.innerHTML = __privateMethod(this, _Gifts_instances, giftsToTemplate_fn).call(this, this.health);
        break;
      case __privateGet(this, _config).categories.harmony.alias:
        __privateGet(this, _elements).all.innerHTML = __privateMethod(this, _Gifts_instances, giftsToTemplate_fn).call(this, this.harmony);
        break;
    }
  }
  /**
   * @returns {Gift[]}
   */
  get best() {
    return this.all.toSorted(
      (a, b) => __privateMethod(this, _Gifts_instances, getTotalSuperpowers_fn).call(this, b) - __privateMethod(this, _Gifts_instances, getTotalSuperpowers_fn).call(this, a)
    );
  }
  /**
   * @returns {Gift[]}
   */
  get random() {
    return this.all.toSorted(
      () => Math.random() - 0.5
    );
  }
  /**
   * @returns {Gift[]}
   */
  get work() {
    return this.all.filter(
      ({ category }) => category === __privateGet(this, _config).categories.work.name
    );
  }
  /**
   * @returns {Gift[]}
   */
  get health() {
    return this.all.filter(
      ({ category }) => category === __privateGet(this, _config).categories.health.name
    );
  }
  /**
   * @returns {Gift[]}
   */
  get harmony() {
    return this.all.filter(
      ({ category }) => category === __privateGet(this, _config).categories.harmony.name
    );
  }
}
_config = new WeakMap();
_elements = new WeakMap();
_giftCssClassName = new WeakMap();
_Gifts_instances = new WeakSet();
/**
 * @param {Gift} gift
 * @returns {string}
 */
giftToTemplate_fn = function(gift) {
  const picture = __privateMethod(this, _Gifts_instances, getPicture_fn).call(this, gift);
  const styleModifier = __privateMethod(this, _Gifts_instances, getStyleModifier_fn).call(this, gift);
  const meta = {
    ...gift,
    picture,
    styleModifier
  };
  const metaEncoded = encodeURI(JSON.stringify(meta));
  return `
      <a class="${__privateGet(this, _giftCssClassName)}" data-category="${gift.category}" data-meta="${metaEncoded}" href="#">
        <img class="${__privateGet(this, _giftCssClassName)}__picture" src="${picture}" alt="${gift.category}">

        <div class="${__privateGet(this, _giftCssClassName)}__text">
          <h4 class="h4 ${__privateGet(this, _giftCssClassName)}__header ${__privateGet(this, _giftCssClassName)}__header--${styleModifier}">
            ${gift.category}
          </h4>

          <h3 class="h3 ${__privateGet(this, _giftCssClassName)}__subheader">
            ${gift.name}
          </h3>
        </div>
      </a>
    `;
};
/**
 * @param {Gift[]} gifts
 * @returns {string}
 */
giftsToTemplate_fn = function(gifts) {
  return gifts.map(__privateMethod(this, _Gifts_instances, giftToTemplate_fn).bind(this)).join("");
};
/**
 * @param {Gift} gift
 * @returns {string}
 */
getPicture_fn = function({ category }) {
  switch (category) {
    case __privateGet(this, _config).categories.work.name:
      return __privateGet(this, _config).categories.work.picture;
    case __privateGet(this, _config).categories.harmony.name:
      return __privateGet(this, _config).categories.harmony.picture;
    case __privateGet(this, _config).categories.health.name:
      return __privateGet(this, _config).categories.health.picture;
    default:
      throw new Error(`Can not find a picture for a category ${category}`);
  }
};
/**
 * @param {Gift} gift
 * @returns {string}
 */
getStyleModifier_fn = function({ category }) {
  switch (category) {
    case __privateGet(this, _config).categories.work.name:
      return __privateGet(this, _config).categories.work.alias;
    case __privateGet(this, _config).categories.harmony.name:
      return __privateGet(this, _config).categories.harmony.alias;
    case __privateGet(this, _config).categories.health.name:
      return __privateGet(this, _config).categories.health.alias;
    default:
      throw new Error(`Can not find a style modifier for a category ${category}`);
  }
};
/**
 * @param {Gift} gift
 * @returns {number}
 */
getTotalSuperpowers_fn = function(gift) {
  const values = Object.values(gift.superpowers);
  return values.reduce((total, value) => total + Number(value), 0);
};
addClickHandlers_fn = function() {
  const containers = Object.values(__privateGet(this, _elements));
  containers.forEach((container) => {
    if (container !== null) {
      container.addEventListener("click", __privateMethod(this, _Gifts_instances, clickHandler_fn).bind(this));
    }
  });
};
/**
 * @param {Event} e
 */
clickHandler_fn = function(e) {
  const item = e.target.closest(`.${__privateGet(this, _giftCssClassName)}`);
  const metaEncoded = item.getAttribute("data-meta");
  if (metaEncoded !== null) {
    e.preventDefault();
    const meta = JSON.parse(decodeURI(metaEncoded));
    __privateGet(this, _config).onClickGift(meta);
  }
};
class Tabs {
  /**
   * @param {TabConfig} config
   */
  constructor({
    cssClassNames,
    cssSelectors,
    onSwitchTab
  }) {
    __privateAdd(this, _Tabs_instances);
    /**
     * @type {TabConfig}
     */
    __privateAdd(this, _config2);
    /**
     * @type {TabElements}
     */
    __privateAdd(this, _elements2);
    __privateSet(this, _config2, {
      cssClassNames,
      cssSelectors,
      onSwitchTab
    });
    __privateSet(this, _elements2, {
      menu: document.querySelector(cssSelectors.menu)
    });
    __privateMethod(this, _Tabs_instances, addClickHandler_fn).call(this);
  }
}
_config2 = new WeakMap();
_elements2 = new WeakMap();
_Tabs_instances = new WeakSet();
addClickHandler_fn = function() {
  if (__privateGet(this, _elements2).menu === null) {
    return;
  }
  __privateGet(this, _elements2).menu.addEventListener("click", __privateMethod(this, _Tabs_instances, clickHandler_fn2).bind(this));
};
/**
 * @param {Event} e
 */
clickHandler_fn2 = function(e) {
  const tab = e.target.getAttribute("data-tab");
  if (tab !== null) {
    e.preventDefault();
    __privateMethod(this, _Tabs_instances, toggleActiveItem_fn).call(this, e.target);
    __privateMethod(this, _Tabs_instances, switchActiveTab_fn).call(this, tab);
  }
};
/**
 * @param {HTMLElement} target
 */
toggleActiveItem_fn = function(target) {
  const { item, active } = __privateGet(this, _config2).cssClassNames;
  const elements = __privateGet(this, _elements2).menu.querySelectorAll(`.${item}`);
  elements.forEach((element) => element.classList.remove(active));
  target.classList.add(active);
};
/**
 * @param {string} tab
 */
switchActiveTab_fn = function(tab) {
  __privateGet(this, _config2).onSwitchTab(tab);
};
class Modal {
  /**
   * @param {ModalConfig} config
   */
  constructor({
    cssClassNames,
    cssSelectors
  }) {
    __privateAdd(this, _Modal_instances);
    /**
     * @type {ModalConfig}
     */
    __privateAdd(this, _config3);
    /**
     * @type {ModalElements}
     */
    __privateAdd(this, _elements3);
    __privateSet(this, _config3, {
      cssClassNames,
      cssSelectors
    });
    __privateSet(this, _elements3, {
      modal: document.querySelector(cssSelectors.modal),
      picture: document.querySelector(cssSelectors.picture),
      text: document.querySelector(cssSelectors.text)
    });
    __privateMethod(this, _Modal_instances, addClickHandler_fn2).call(this);
  }
  /**
   * @param {GiftMeta} meta
   */
  show(meta) {
    if (__privateGet(this, _elements3).picture === null || __privateGet(this, _elements3).text === null) {
      return;
    }
    __privateGet(this, _elements3).picture.src = meta.picture;
    __privateGet(this, _elements3).text.innerHTML = __privateMethod(this, _Modal_instances, metaToTemplate_fn).call(this, meta);
    document.body.classList.add("modal-opened");
  }
  hide() {
    document.body.classList.remove("modal-opened");
  }
}
_config3 = new WeakMap();
_elements3 = new WeakMap();
_Modal_instances = new WeakSet();
addClickHandler_fn2 = function() {
  if (__privateGet(this, _elements3).modal === null) {
    return;
  }
  __privateGet(this, _elements3).modal.addEventListener("click", __privateMethod(this, _Modal_instances, clickHandler_fn3).bind(this));
};
/**
 * @param {Event} e
 */
clickHandler_fn3 = function(e) {
  const isClickedBackdrop = e.target === __privateGet(this, _elements3).modal;
  const isClickedClose = e.target.classList.contains(__privateGet(this, _config3).cssClassNames.close) || e.target.parentElement.classList.contains(__privateGet(this, _config3).cssClassNames.close);
  if (isClickedBackdrop || isClickedClose) {
    e.preventDefault();
    this.hide();
  }
};
/**
 * @param {GiftMeta} meta
 */
metaToTemplate_fn = function(meta) {
  const superpowers = __privateMethod(this, _Modal_instances, superpowersToTemplate_fn).call(this, meta.superpowers);
  return `
      <h4 class="h4 card__header card__header--${meta.styleModifier}">
        ${meta.category}
      </h4>

      <h3 class="h3">
        ${meta.name}
      </h3>

      <p class="card__description">
        ${meta.description}
      </p>

      <div class="card__info">
        <h4 class="h4">Adds superpowers to:</h4>

        <div class="card__superpowers">
          ${superpowers}
        </div>
      </div>
    `;
};
/**
 * @param {GiftMeta['superpowers']} superpowers
 */
superpowersToTemplate_fn = function(superpowers) {
  const entries = Object.entries(superpowers);
  let template = "";
  entries.forEach((entry) => {
    template += __privateMethod(this, _Modal_instances, superpowerToTemplate_fn).call(this, entry);
  });
  return template;
};
/**
 * @param {string[]} entry
 */
superpowerToTemplate_fn = function([superpower, rating]) {
  const stars = __privateMethod(this, _Modal_instances, ratingToTemplate_fn).call(this, rating);
  return `
      <div class="card__superpower">
        <div>${superpower}</div>

        <div class="card__rating">
          <span>${rating}</span>

          <div class="card__stars">
            ${stars}
          </div>
        </div>
      </div>
    `;
};
/**
 * @param {string} rating
 */
ratingToTemplate_fn = function(rating) {
  const amount = Number(rating) / 100;
  let template = "";
  for (let i = 0; i < 5; i++) {
    const isDisabled = i + 1 > amount;
    const cssClasses = isDisabled ? "card__star card__star--disabled" : "card__star";
    template += `
        <img class="${cssClasses}" src="assets/common/modal/snowflake.svg" alt="Star">
      `;
  }
  return template;
};
class Slider {
  /**
   * @param {SliderConfig} config
   */
  constructor({
    clicks,
    cssClassNames,
    cssSelectors
  }) {
    __privateAdd(this, _Slider_instances);
    /**
     * @type {SliderConfig}
     */
    __privateAdd(this, _config4);
    /**
     * @type {SliderElements}
     */
    __privateAdd(this, _elements4);
    __privateSet(this, _config4, {
      clicks,
      cssClassNames,
      cssSelectors
    });
    __privateSet(this, _elements4, {
      slider: document.querySelector(cssSelectors.slider),
      items: document.querySelector(cssSelectors.items),
      left: document.querySelector(cssSelectors.left),
      right: document.querySelector(cssSelectors.right)
    });
    __privateMethod(this, _Slider_instances, addClickHandlers_fn2).call(this);
    __privateMethod(this, _Slider_instances, addControlStateHandler_fn).call(this);
    __privateMethod(this, _Slider_instances, addResizeHandler_fn).call(this);
  }
}
_config4 = new WeakMap();
_elements4 = new WeakMap();
_Slider_instances = new WeakSet();
addClickHandlers_fn2 = function() {
  if (__privateGet(this, _elements4).left === null || __privateGet(this, _elements4).right === null) {
    return;
  }
  __privateGet(this, _elements4).left.addEventListener("click", __privateMethod(this, _Slider_instances, clickHandlerLeft_fn).bind(this));
  __privateGet(this, _elements4).right.addEventListener("click", __privateMethod(this, _Slider_instances, clickHandlerRight_fn).bind(this));
};
addControlStateHandler_fn = function() {
  if (__privateGet(this, _elements4).items === null) {
    return;
  }
  __privateGet(this, _elements4).items.addEventListener(
    "transitionend",
    __privateMethod(this, _Slider_instances, controlStateHandler_fn).bind(this)
  );
};
addResizeHandler_fn = function() {
  window.addEventListener("resize", __privateMethod(this, _Slider_instances, resizeHandler_fn).bind(this));
};
/**
 * @param {Event} e
 */
clickHandlerLeft_fn = function(e) {
  e.preventDefault();
  __privateMethod(this, _Slider_instances, disableControls_fn).call(this);
  __privateMethod(this, _Slider_instances, scrollToLeft_fn).call(this);
};
/**
 * @param {Event} e
 */
clickHandlerRight_fn = function(e) {
  e.preventDefault();
  __privateMethod(this, _Slider_instances, disableControls_fn).call(this);
  __privateMethod(this, _Slider_instances, scrollToRight_fn).call(this);
};
controlStateHandler_fn = function() {
  if (__privateGet(this, _elements4).left === null || __privateGet(this, _elements4).right === null) {
    return;
  }
  if (__privateGet(this, _Slider_instances, isScrolledToLeft_get)) {
    __privateGet(this, _elements4).left.classList.add(__privateGet(this, _config4).cssClassNames.disabled);
  } else {
    __privateGet(this, _elements4).left.classList.remove(__privateGet(this, _config4).cssClassNames.disabled);
  }
  if (__privateGet(this, _Slider_instances, isScrolledToRight_get)) {
    __privateGet(this, _elements4).right.classList.add(__privateGet(this, _config4).cssClassNames.disabled);
  } else {
    __privateGet(this, _elements4).right.classList.remove(__privateGet(this, _config4).cssClassNames.disabled);
  }
};
resizeHandler_fn = function() {
  __privateMethod(this, _Slider_instances, scrollReset_fn).call(this);
};
disableControls_fn = function() {
  __privateGet(this, _elements4).left.classList.add(__privateGet(this, _config4).cssClassNames.disabled);
  __privateGet(this, _elements4).right.classList.add(__privateGet(this, _config4).cssClassNames.disabled);
};
scrollToLeft_fn = function() {
  __privateSet(this, _Slider_instances, __privateGet(this, _Slider_instances, itemsScrollLeft_get) + __privateGet(this, _Slider_instances, scrollPadding_get), itemsScrollLeft_set);
};
scrollToRight_fn = function() {
  __privateSet(this, _Slider_instances, __privateGet(this, _Slider_instances, itemsScrollLeft_get) - __privateGet(this, _Slider_instances, scrollPadding_get), itemsScrollLeft_set);
};
scrollReset_fn = function() {
  __privateSet(this, _Slider_instances, 0, itemsScrollLeft_set);
};
sliderComputedStyle_get = function() {
  if (__privateGet(this, _elements4).slider === null) {
    throw new Error("Can not find config.cssSelectors.slider element");
  }
  return getComputedStyle(__privateGet(this, _elements4).slider);
};
sliderPaddingLeft_get = function() {
  return parseFloat(__privateGet(this, _Slider_instances, sliderComputedStyle_get).getPropertyValue("padding-left"));
};
sliderPaddingRight_get = function() {
  return parseFloat(__privateGet(this, _Slider_instances, sliderComputedStyle_get).getPropertyValue("padding-right"));
};
sliderOffsetWidth_get = function() {
  if (__privateGet(this, _elements4).slider === null) {
    return 0;
  }
  return __privateGet(this, _elements4).slider.offsetWidth;
};
scrollWidth_get = function() {
  if (__privateGet(this, _elements4).items === null) {
    return 0;
  }
  return __privateGet(this, _elements4).items.scrollWidth + __privateGet(this, _Slider_instances, sliderPaddingLeft_get) + __privateGet(this, _Slider_instances, sliderPaddingRight_get);
};
itemsScrollLeft_get = function() {
  if (__privateGet(this, _elements4).items === null) {
    return 0;
  }
  return __privateGet(this, _elements4).items.offsetLeft - __privateGet(this, _Slider_instances, sliderPaddingLeft_get);
};
itemsScrollLeft_set = function(value) {
  if (__privateGet(this, _elements4).items === null) {
    return;
  }
  return __privateGet(this, _elements4).items.style.left = `${value}px`;
};
scrollOverflow_get = function() {
  return __privateGet(this, _Slider_instances, scrollWidth_get) - __privateGet(this, _Slider_instances, sliderOffsetWidth_get);
};
amountOfClicks_get = function() {
  const mediaQueryList = window.matchMedia(
    `(max-width: ${__privateGet(this, _config4).clicks.maxSize})`
  );
  return mediaQueryList.matches ? __privateGet(this, _config4).clicks.amountMobile : __privateGet(this, _config4).clicks.amount;
};
scrollPadding_get = function() {
  return Math.ceil(__privateGet(this, _Slider_instances, scrollOverflow_get) / __privateGet(this, _Slider_instances, amountOfClicks_get));
};
isScrolledToLeft_get = function() {
  return __privateGet(this, _Slider_instances, itemsScrollLeft_get) === 0;
};
isScrolledToRight_get = function() {
  return Math.abs(__privateGet(this, _Slider_instances, itemsScrollLeft_get)) >= Math.abs(__privateGet(this, _Slider_instances, scrollOverflow_get));
};
class Burger {
  /**
   * @param {BurgerConfig} config
   */
  constructor({
    cssClassNames,
    cssSelectors
  }) {
    __privateAdd(this, _Burger_instances);
    /**
     * @type {BurgerConfig}
     */
    __privateAdd(this, _config5);
    /**
     * @type {BurgerElements}
     */
    __privateAdd(this, _elements5);
    __privateSet(this, _config5, {
      cssClassNames,
      cssSelectors
    });
    __privateSet(this, _elements5, {
      burger: document.querySelector(cssSelectors.burger),
      close: document.querySelector(cssSelectors.close),
      menu: document.querySelector(cssSelectors.menu)
    });
    __privateMethod(this, _Burger_instances, addClickHandlers_fn3).call(this);
  }
}
_config5 = new WeakMap();
_elements5 = new WeakMap();
_Burger_instances = new WeakSet();
addClickHandlers_fn3 = function() {
  if (__privateGet(this, _elements5).burger === null || __privateGet(this, _elements5).close === null) {
    return;
  }
  __privateGet(this, _elements5).burger.addEventListener("click", __privateMethod(this, _Burger_instances, clickBurgerHandler_fn).bind(this));
  __privateGet(this, _elements5).close.addEventListener("click", __privateMethod(this, _Burger_instances, clickCloseHandler_fn).bind(this));
  __privateGet(this, _elements5).menu.addEventListener("click", __privateMethod(this, _Burger_instances, clickMenuHandler_fn).bind(this));
};
/**
 * @param {Event} e
 */
clickBurgerHandler_fn = function(e) {
  e.preventDefault();
  __privateMethod(this, _Burger_instances, show_fn).call(this);
};
/**
 * @param {Event} e
 */
clickCloseHandler_fn = function(e) {
  e.preventDefault();
  __privateMethod(this, _Burger_instances, hide_fn).call(this);
};
/**
 * @param {Event} e
 */
clickMenuHandler_fn = function(e) {
  const { link } = __privateGet(this, _config5).cssClassNames;
  const isLink = e.target.classList.contains(link);
  if (isLink) {
    __privateMethod(this, _Burger_instances, hide_fn).call(this);
  }
};
show_fn = function() {
  document.body.classList.add("menu-burger-opened");
};
hide_fn = function() {
  document.body.classList.remove("menu-burger-opened");
};
class Countdown {
  /**
   * @param {CountdownConfig} config
   */
  constructor({ cssSelectors, date }) {
    __privateAdd(this, _Countdown_instances);
    /**
     * @type {CountdownConfig}
     */
    __privateAdd(this, _config6);
    /**
     * @type {CountdownElements}
     */
    __privateAdd(this, _elements6);
    /**
     * @type {number}
     */
    __privateAdd(this, _interval);
    /**
     * @type {number}
     */
    __privateAdd(this, _seconds, 0);
    __privateSet(this, _config6, {
      cssSelectors,
      date
    });
    __privateSet(this, _elements6, {
      days: document.querySelector(cssSelectors.days),
      hours: document.querySelector(cssSelectors.hours),
      minutes: document.querySelector(cssSelectors.minutes),
      seconds: document.querySelector(cssSelectors.seconds)
    });
    __privateMethod(this, _Countdown_instances, start_fn).call(this);
  }
}
_config6 = new WeakMap();
_elements6 = new WeakMap();
_interval = new WeakMap();
_seconds = new WeakMap();
_Countdown_instances = new WeakSet();
start_fn = function() {
  if (__privateGet(this, _elements6).days === null || __privateGet(this, _elements6).hours === null || __privateGet(this, _elements6).minutes === null || __privateGet(this, _elements6).seconds === null) {
    return;
  }
  const diff = __privateGet(this, _config6).date.getTime() - (/* @__PURE__ */ new Date()).getTime();
  __privateSet(this, _seconds, Math.floor(diff / 1e3));
  __privateSet(this, _interval, setInterval(__privateMethod(this, _Countdown_instances, update_fn).bind(this), 1e3));
};
update_fn = function() {
  if (__privateGet(this, _seconds) < 0) {
    clearInterval(__privateGet(this, _interval));
  }
  const days = Math.floor(__privateGet(this, _seconds) / (3600 * 24));
  const hours = Math.floor(__privateGet(this, _seconds) % (3600 * 24) / 3600);
  const minutes = Math.floor(__privateGet(this, _seconds) % 3600 / 60);
  const seconds = Math.floor(__privateGet(this, _seconds) % 60);
  __privateGet(this, _elements6).days.innerText = String(days);
  __privateGet(this, _elements6).hours.innerText = String(hours);
  __privateGet(this, _elements6).minutes.innerText = String(minutes);
  __privateGet(this, _elements6).seconds.innerText = String(seconds);
  __privateSet(this, _seconds, __privateGet(this, _seconds) - 1);
};
class Up {
  /**
   * @param {UpConfig} config
   */
  constructor({
    cssClassNames,
    cssSelectors,
    maxSize
  }) {
    __privateAdd(this, _Up_instances);
    /**
     * @type {UpConfig}
     */
    __privateAdd(this, _config7);
    /**
     * @type {UpElements}
     */
    __privateAdd(this, _elements7);
    /**
     * @type {number}
     */
    __privateAdd(this, _offset, 300);
    __privateSet(this, _config7, {
      cssClassNames,
      cssSelectors,
      maxSize
    });
    __privateSet(this, _elements7, {
      up: document.querySelector(cssSelectors.up)
    });
    __privateMethod(this, _Up_instances, addScrollHandler_fn).call(this);
  }
}
_config7 = new WeakMap();
_elements7 = new WeakMap();
_offset = new WeakMap();
_Up_instances = new WeakSet();
addScrollHandler_fn = function() {
  if (__privateGet(this, _elements7).up === null) {
    return;
  }
  window.addEventListener("scroll", __privateMethod(this, _Up_instances, scrollHandler_fn).bind(this));
};
scrollHandler_fn = function() {
  const mediaQueryList = window.matchMedia(
    `(max-width: ${__privateGet(this, _config7).maxSize})`
  );
  if (!mediaQueryList.matches) {
    return;
  }
  if (document.documentElement.scrollTop >= __privateGet(this, _offset)) {
    __privateGet(this, _elements7).up.classList.add(__privateGet(this, _config7).cssClassNames.visible);
  } else {
    __privateGet(this, _elements7).up.classList.remove(__privateGet(this, _config7).cssClassNames.visible);
  }
};
const init = async function() {
  const modal = new Modal({
    cssClassNames: {
      close: "modal__close"
    },
    cssSelectors: {
      modal: ".modal",
      picture: ".modal .card__picture",
      text: ".modal .card__text"
    }
  });
  const gifts = new Gifts({
    bestAmount: 4,
    categories: {
      all: {
        name: "All",
        alias: "all",
        picture: ""
      },
      work: {
        name: "For Work",
        alias: "work",
        picture: "assets/common/gifts/gift-for-work.png"
      },
      health: {
        name: "For Health",
        alias: "health",
        picture: "assets/common/gifts/gift-for-health.png"
      },
      harmony: {
        name: "For Harmony",
        alias: "harmony",
        picture: "assets/common/gifts/gift-for-harmony.png"
      }
    },
    cssSelectors: {
      all: ".all-gifts .cards",
      best: "#best-gifts .cards"
    },
    onClickGift(meta) {
      modal.show(meta);
    }
  });
  await gifts.load();
  new Tabs({
    cssClassNames: {
      item: "menu__link",
      active: "menu__link--active"
    },
    cssSelectors: {
      menu: ".all-gifts__menu"
    },
    onSwitchTab(tab) {
      gifts.insertAll(tab);
    }
  });
  new Slider({
    clicks: {
      amount: 3,
      amountMobile: 6,
      maxSize: "768px"
    },
    cssClassNames: {
      disabled: "button--disabled"
    },
    cssSelectors: {
      slider: ".slider",
      items: ".slider__items",
      left: ".slider__control--left",
      right: ".slider__control--right"
    }
  });
  new Burger({
    cssClassNames: {
      link: "menu-burger__link"
    },
    cssSelectors: {
      burger: ".header__menu-burger",
      close: ".header__menu-close",
      menu: ".menu-burger"
    }
  });
  new Countdown({
    cssSelectors: {
      days: ".countdown__days",
      hours: ".countdown__hours",
      minutes: ".countdown__minutes",
      seconds: ".countdown__seconds"
    },
    date: /* @__PURE__ */ new Date("2025-01-01")
  });
  new Up({
    cssClassNames: {
      visible: "up--visible"
    },
    cssSelectors: {
      up: ".up"
    },
    maxSize: "768px"
  });
};
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=app-CyZN4-cf.js.map
