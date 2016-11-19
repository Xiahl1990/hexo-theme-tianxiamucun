/*! AdminLTE app.js
 * ================
 * Main JS application file for AdminLTE v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive AdminLTE plugins.
 *
 * @Author  Almsaeed Studio
 * @Support <http://www.almsaeedstudio.com>
 * @Email   <support@almsaeedstudio.com>
 * @version 2.3.3
 * @license MIT <http://opensource.org/licenses/MIT>
 */

//Make sure jQuery has been loaded before app.js
if (typeof jQuery === "undefined") {
  throw new Error("AdminLTE requires jQuery");
}

/**
   * Store a new settings in the browser
   *
   * @param String name Name of the setting
   * @param String val Value of the setting
   * @returns void
   */
  function store(name, val) {
    if (typeof (Storage) !== "undefined") {
      localStorage.setItem(name, val);
    } else {
      window.alert('Please use a modern browser to properly view this template!');
    }
  }

  /**
   * Get a prestored setting
   *
   * @param String name Name of of the setting
   * @returns String The value of the setting | null
   */
  function get(name) {
    if (typeof (Storage) !== "undefined") {
      return localStorage.getItem(name);
    } else {
      window.alert('Please use a modern browser to properly view this template!');
    }
  }

  /**
   * Remove a prestored setting
   *
   * @param String name Name of of the setting
   * @returns String The value of the setting | null
   */
  function remove(name) {
    if (typeof (Storage) !== "undefined") {
      return localStorage.removeItem(name);
    } else {
      window.alert('Please use a modern browser to properly view this template!');
    }
  }

  /**
   * INITIALIZE EDITOR TO MARKDOWN
   * ------------------------
   */
  function initEditor(){
    var _height = parseInt($(".content-wrapper").css("min-height")).toString();
    window.editor = editormd("editormd", {
        path : "/vendor/editor/lib/",
        height : _height
    });
  }

/* AdminLTE
 *
 * @type Object
 * @description $.AdminLTE is the main object for the template's app.
 *              It's used for implementing functions and options related
 *              to the template. Keeping everything wrapped in an object
 *              prevents conflict with other plugins and is a better
 *              way to organize our code.
 */
$.AdminLTE = {};

/* --------------------
 * - AdminLTE Options -
 * --------------------
 * Modify these options to suit your implementation
 */
$.AdminLTE.options = {
  //Add slimscroll to navbar menus
  //This requires you to load the slimscroll plugin
  //in every page before app.js
  navbarMenuSlimscroll: true,
  navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
  navbarMenuHeight: "200px", //The height of the inner menu
  //General animation speed for JS animated elements such as box collapse/expand and
  //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
  //'fast', 'normal', or 'slow'
  animationSpeed: 500,
  //Sidebar push menu toggle button selector
  sidebarToggleSelector: "[data-toggle='offcanvas']",
  //Activate sidebar push menu
  sidebarPushMenu: true,
  //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
  sidebarSlimScroll: true,
  //Enable sidebar expand on hover effect for sidebar mini
  //This option is forced to true if both the fixed layout and sidebar mini
  //are used together
  sidebarExpandOnHover: false,
  //BoxRefresh Plugin
  enableBoxRefresh: true,
  //Bootstrap.js tooltip
  enableBSToppltip: true,
  BSTooltipSelector: "[data-toggle='tooltip']",
  //Enable Fast Click. Fastclick.js creates a more
  //native touch experience with touch devices. If you
  //choose to enable the plugin, make sure you load the script
  //before AdminLTE's app.js
  enableFastclick: true,
  //Control Sidebar Options
  enableControlSidebar: true,
  controlSidebarOptions: {
    //Which button should trigger the open/close event
    toggleBtnSelector: "[data-toggle='control-sidebar']",
    //The sidebar selector
    selector: ".control-sidebar",
    //Enable slide over content
    slide: true
  },
  //Box Widget Plugin. Enable this plugin
  //to allow boxes to be collapsed and/or removed
  enableBoxWidget: true,
  //Box Widget plugin options
  boxWidgetOptions: {
    boxWidgetIcons: {
      //Collapse icon
      collapse: 'fa-minus',
      //Open icon
      open: 'fa-plus',
      //Remove icon
      remove: 'fa-times'
    },
    boxWidgetSelectors: {
      //Remove button selector
      remove: '[data-widget="remove"]',
      //Collapse button selector
      collapse: '[data-widget="collapse"]'
    }
  },
  //Direct Chat plugin options
  directChat: {
    //Enable direct chat by default
    enable: true,
    //The button to open and close the chat contacts pane
    contactToggleSelector: '[data-widget="chat-pane-toggle"]'
  },
  //Define the set of colors to use globally around the website
  colors: {
    lightBlue: "#3c8dbc",
    red: "#f56954",
    green: "#00a65a",
    aqua: "#00c0ef",
    yellow: "#f39c12",
    blue: "#0073b7",
    navy: "#001F3F",
    teal: "#39CCCC",
    olive: "#3D9970",
    lime: "#01FF70",
    orange: "#FF851B",
    fuchsia: "#F012BE",
    purple: "#8E24AA",
    maroon: "#D81B60",
    black: "#222222",
    gray: "#d2d6de"
  },
  //The standard screen sizes that bootstrap uses.
  //If you change these in the variables.less file, change
  //them here too.
  screenSizes: {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200
  }
};

/* ------------------
 * - Implementation -
 * ------------------
 * The next block of code implements AdminLTE's
 * functions and plugins as specified by the
 * options above.
 */
$(function () {
  "use strict";

  //Fix for IE page transitions
  $("body").removeClass("hold-transition");

  //Extend options if external options exist
  if (typeof AdminLTEOptions !== "undefined") {
    $.extend(true,
        $.AdminLTE.options,
        AdminLTEOptions);
  }

  //Easy access to options
  var o = $.AdminLTE.options;

  //Set up the object
  _init();

  //Activate the layout maker
  $.AdminLTE.layout.activate();

  //Enable sidebar tree view controls
  $.AdminLTE.tree('.sidebar');

  //Enable control sidebar
  if (o.enableControlSidebar) {
    $.AdminLTE.controlSidebar.activate();
  }

  //Add slimscroll to navbar dropdown
  if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
    $(".navbar .menu").slimscroll({
      height: o.navbarMenuHeight,
      alwaysVisible: false,
      size: o.navbarMenuSlimscrollWidth
    }).css("width", "100%");
  }

  //Activate sidebar push menu
  if (o.sidebarPushMenu) {
    $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
  }

  //Activate Bootstrap tooltip
  if (o.enableBSToppltip) {
    $('body').tooltip({
      selector: o.BSTooltipSelector
    });
  }

  //Activate box widget
  if (o.enableBoxWidget) {
    $.AdminLTE.boxWidget.activate();
  }

  //Activate fast click
  if (o.enableFastclick && typeof FastClick != 'undefined') {
    FastClick.attach(document.body);
  }

  //Activate direct chat widget
  if (o.directChat.enable) {
    $(document).on('click', o.directChat.contactToggleSelector, function () {
      var box = $(this).parents('.direct-chat').first();
      box.toggleClass('direct-chat-contacts-open');
    });
  }

  // Setting sidebar collapse
  var screenSizes = $.AdminLTE.options.screenSizes;
  if(get("iscollapse") === "false" || get("iscollapse") === null){
    //Enable sidebar push menu
    if ($(window).width() > (screenSizes.sm - 1)) {
      $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
      $("#article-nav-button").css("left","230px");
    }
    //Handle sidebar push menu for small screens
    else {
      $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
      $("#article-nav-button").css("left","0px");
    }
  }else{
    //Enable sidebar push menu
    if ($(window).width() > (screenSizes.sm - 1)) {
      $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
      $("#article-nav-button").css("left","50px");
    }
    //Handle sidebar push menu for small screens
    else {
      $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
      $("#article-nav-button").css("left","0px");
    }
  }


  /*
   * INITIALIZE BUTTON TOGGLE
   * ------------------------
   */
  $('.btn-group[data-toggle="btn-toggle"]').each(function () {
    var group = $(this);
    $(this).find(".btn").on('click', function (e) {
      group.find(".btn.active").removeClass("active");
      $(this).addClass("active");
      e.preventDefault();
    });
  });

  /*
   * INITIALIZE EDITOR TO MARKDOWN
   * ------------------------
   */
  if($('#editormd').length>0){
      initEditor();
      $(window).resize(initEditor);
  }

});

/* ----------------------------------
 * - Initialize the AdminLTE Object -
 * ----------------------------------
 * All AdminLTE functions are implemented below.
 */
function _init() {
  'use strict';
  /* Layout
   * ======
   * Fixes the layout height in case min-height fails.
   *
   * @type Object
   * @usage $.AdminLTE.layout.activate()
   *        $.AdminLTE.layout.fix()
   *        $.AdminLTE.layout.fixSidebar()
   */
  $.AdminLTE.layout = {
    activate: function () {
      var _this = this;
      _this.fix();
      _this.fixSidebar();
      $(window, ".wrapper").resize(function () {
        _this.fix();
        _this.fixSidebar();
      });
    },
    fix: function () {
      //Get window height and the wrapper height
      var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
      var window_height = $(window).height();
      var sidebar_height = $(".sidebar").height();
      //Set the min-height of the content and sidebar based on the
      //the height of the document.
      if ($("body").hasClass("fixed")) {
        $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
      } else {
        var postSetWidth;
        if (window_height >= sidebar_height) {
          $(".content-wrapper, .right-side").css('min-height', window_height - neg);
          postSetWidth = window_height - neg;
        } else {
          $(".content-wrapper, .right-side").css('min-height', sidebar_height);
          postSetWidth = sidebar_height;
        }

        //Fix for the control sidebar height
        var controlSidebar = $($.AdminLTE.options.controlSidebarOptions.selector);
        if (typeof controlSidebar !== "undefined") {
          if (controlSidebar.height() > postSetWidth)
            $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
        }

      }
    },
    fixSidebar: function () {
      //Make sure the body tag has the .fixed class
      if (!$("body").hasClass("fixed")) {
        if (typeof $.fn.slimScroll != 'undefined') {
          $(".sidebar").slimScroll({destroy: true}).height("auto");
        }
        return;
      } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
        window.console.error("Error: the fixed layout requires the slimscroll plugin!");
      }
      //Enable slimscroll for fixed layout
      if ($.AdminLTE.options.sidebarSlimScroll) {
        if (typeof $.fn.slimScroll != 'undefined') {
          //Destroy if it exists
          $(".sidebar").slimScroll({destroy: true}).height("auto");
          //Add slimscroll
          $(".sidebar").slimscroll({
            height: ($(window).height() - $(".main-header").height()) + "px",
            color: "rgba(0,0,0,0.2)",
            size: "3px"
          });
        }
      }
    }
  };

  /* PushMenu()
   * ==========
   * Adds the push menu functionality to the sidebar.
   *
   * @type Function
   * @usage: $.AdminLTE.pushMenu("[data-toggle='offcanvas']")
   */
  $.AdminLTE.pushMenu = {
    activate: function (toggleBtn) {
      //Get the screen sizes
      var screenSizes = $.AdminLTE.options.screenSizes;

      //Enable sidebar toggle
      $(document).on('click', toggleBtn, function (e) {
        e.preventDefault();

        //Enable sidebar push menu
        if ($(window).width() > (screenSizes.sm - 1)) {
          if ($("body").hasClass('sidebar-collapse')) {
            $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
            store("iscollapse",false);
            $("#article-nav-button").css("left","230px");
          } else {
            $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
            store("iscollapse",true);
            $("#article-nav-button").css("left","50px");
          }
        }
        //Handle sidebar push menu for small screens
        else {
          if ($("body").hasClass('sidebar-open')) {
            $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
            store("iscollapse",true);
            $("#article-nav-button").css("left","0px");
          } else {
            $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
            store("iscollapse",false);
            $("#article-nav-button").css("left","0px");
          }
        }

        initEditor();
      });

      $(".content-wrapper").click(function () {
        //Enable hide menu when clicking on the content-wrapper on small screens
        if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
          $("body").removeClass('sidebar-open');
        }
      });

      //Enable expand on hover for sidebar mini
      if ($.AdminLTE.options.sidebarExpandOnHover
          || ($('body').hasClass('fixed')
          && $('body').hasClass('sidebar-mini'))) {
        this.expandOnHover();
      }
    },
    expandOnHover: function () {
      var _this = this;
      var screenWidth = $.AdminLTE.options.screenSizes.sm - 1;
      //Expand sidebar on hover
      $('.main-sidebar').hover(function () {
        if ($('body').hasClass('sidebar-mini')
            && $("body").hasClass('sidebar-collapse')
            && $(window).width() > screenWidth) {
          _this.expand();
        }
      }, function () {
        if ($('body').hasClass('sidebar-mini')
            && $('body').hasClass('sidebar-expanded-on-hover')
            && $(window).width() > screenWidth) {
          _this.collapse();
        }
      });
    },
    expand: function () {
      $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
    },
    collapse: function () {
      if ($('body').hasClass('sidebar-expanded-on-hover')) {
        $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
      }
    }
  };

  /* Tree()
   * ======
   * Converts the sidebar into a multilevel
   * tree view menu.
   *
   * @type Function
   * @Usage: $.AdminLTE.tree('.sidebar')
   */
  $.AdminLTE.tree = function (menu) {
    var _this = this;
    var animationSpeed = $.AdminLTE.options.animationSpeed;
    $(document).on('click', menu + ' li a', function (e) {
      //Get the clicked link and the next element
      var $this = $(this);
      var checkElement = $this.next();

      //Check if the next element is a menu and is visible
      if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
        //Close the menu
        checkElement.slideUp(animationSpeed, function () {
          checkElement.removeClass('menu-open');
          //Fix the layout in case the sidebar stretches over the height of the window
          //_this.layout.fix();
        });
        checkElement.parent("li").removeClass("active");
      }
      //If the menu is not visible
      else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
        //Get the parent menu
        var parent = $this.parents('ul').first();
        //Close all open menus within the parent
        var ul = parent.find('ul:visible').slideUp(animationSpeed);
        //Remove the menu-open class from the parent
        ul.removeClass('menu-open');
        //Get the parent li
        var parent_li = $this.parent("li");

        //Open the target menu and add the menu-open class
        checkElement.slideDown(animationSpeed, function () {
          //Add the class active to the parent li
          checkElement.addClass('menu-open');
          parent.find('li.active').removeClass('active');
          parent_li.addClass('active');
          //Fix the layout in case the sidebar stretches over the height of the window
          _this.layout.fix();
        });
      }
      //if this isn't a link, prevent the page from being redirected
      if (checkElement.is('.treeview-menu')) {
        e.preventDefault();
      }
    });
  };

  /* ControlSidebar
   * ==============
   * Adds functionality to the right sidebar
   *
   * @type Object
   * @usage $.AdminLTE.controlSidebar.activate(options)
   */
  $.AdminLTE.controlSidebar = {
    //instantiate the object
    activate: function () {
      //Get the object
      var _this = this;
      //Update options
      var o = $.AdminLTE.options.controlSidebarOptions;
      //Get the sidebar
      var sidebar = $(o.selector);
      //The toggle button
      var btn = $(o.toggleBtnSelector);

      //Listen to the click event
      btn.on('click', function (e) {
        e.preventDefault();
        //If the sidebar is not open
        if (!sidebar.hasClass('control-sidebar-open')
            && !$('body').hasClass('control-sidebar-open')) {
          //Open the sidebar
          _this.open(sidebar, o.slide);
        } else {
          _this.close(sidebar, o.slide);
        }
      });

      //If the body has a boxed layout, fix the sidebar bg position
      var bg = $(".control-sidebar-bg");
      _this._fix(bg);

      //If the body has a fixed layout, make the control sidebar fixed
      if ($('body').hasClass('fixed')) {
        _this._fixForFixed(sidebar);
      } else {
        //If the content height is less than the sidebar's height, force max height
        if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
          _this._fixForContent(sidebar);
        }
      }
    },
    //Open the control sidebar
    open: function (sidebar, slide) {
      //Slide over content
      if (slide) {
        sidebar.addClass('control-sidebar-open');
      } else {
        //Push the content by adding the open class to the body instead
        //of the sidebar itself
        $('body').addClass('control-sidebar-open');
      }
    },
    //Close the control sidebar
    close: function (sidebar, slide) {
      if (slide) {
        sidebar.removeClass('control-sidebar-open');
      } else {
        $('body').removeClass('control-sidebar-open');
      }
    },
    _fix: function (sidebar) {
      var _this = this;
      if ($("body").hasClass('layout-boxed')) {
        sidebar.css('position', 'absolute');
        sidebar.height($(".wrapper").height());
        $(window).resize(function () {
          _this._fix(sidebar);
        });
      } else {
        sidebar.css({
          'position': 'fixed',
          'height': 'auto'
        });
      }
    },
    _fixForFixed: function (sidebar) {
      sidebar.css({
        'position': 'fixed',
        'max-height': '100%',
        'overflow': 'auto',
        'padding-bottom': '50px'
      });
    },
    _fixForContent: function (sidebar) {
      $(".content-wrapper, .right-side").css('min-height', sidebar.height());
    }
  };

  /* BoxWidget
   * =========
   * BoxWidget is a plugin to handle collapsing and
   * removing boxes from the screen.
   *
   * @type Object
   * @usage $.AdminLTE.boxWidget.activate()
   *        Set all your options in the main $.AdminLTE.options object
   */
  $.AdminLTE.boxWidget = {
    selectors: $.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
    icons: $.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
    animationSpeed: $.AdminLTE.options.animationSpeed,
    activate: function (_box) {
      var _this = this;
      if (!_box) {
        _box = document; // activate all boxes per default
      }
      //Listen for collapse event triggers
      $(_box).on('click', _this.selectors.collapse, function (e) {
        e.preventDefault();
        _this.collapse($(this));
      });

      //Listen for remove event triggers
      $(_box).on('click', _this.selectors.remove, function (e) {
        e.preventDefault();
        _this.remove($(this));
      });
    },
    collapse: function (element) {
      var _this = this;
      //Find the box parent
      var box = element.parents(".box").first();
      //Find the body and the footer
      var box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
      if (!box.hasClass("collapsed-box")) {
        //Convert minus into plus
        element.children(":first")
            .removeClass(_this.icons.collapse)
            .addClass(_this.icons.open);
        //Hide the content
        box_content.slideUp(_this.animationSpeed, function () {
          box.addClass("collapsed-box");
        });
      } else {
        //Convert plus into minus
        element.children(":first")
            .removeClass(_this.icons.open)
            .addClass(_this.icons.collapse);
        //Show the content
        box_content.slideDown(_this.animationSpeed, function () {
          box.removeClass("collapsed-box");
        });
      }
    },
    remove: function (element) {
      //Find the box parent
      var box = element.parents(".box").first();
      box.slideUp(this.animationSpeed);
    }
  };
}

/* ------------------
 * - Custom Plugins -
 * ------------------
 * All custom plugins are defined below.
 */

/*
 * BOX REFRESH BUTTON
 * ------------------
 * This is a custom plugin to use with the component BOX. It allows you to add
 * a refresh button to the box. It converts the box's state to a loading state.
 *
 * @type plugin
 * @usage $("#box-widget").boxRefresh( options );
 */
(function ($) {

  "use strict";

  $.fn.boxRefresh = function (options) {

    // Render options
    var settings = $.extend({
      //Refresh button selector
      trigger: ".refresh-btn",
      //File source to be loaded (e.g: ajax/src.php)
      source: "",
      //Callbacks
      onLoadStart: function (box) {
        return box;
      }, //Right after the button has been clicked
      onLoadDone: function (box) {
        return box;
      } //When the source has been loaded

    }, options);

    //The overlay
    var overlay = $('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');

    return this.each(function () {
      //if a source is specified
      if (settings.source === "") {
        if (window.console) {
          window.console.log("Please specify a source first - boxRefresh()");
        }
        return;
      }
      //the box
      var box = $(this);
      //the button
      var rBtn = box.find(settings.trigger).first();

      //On trigger click
      rBtn.on('click', function (e) {
        e.preventDefault();
        //Add loading overlay
        start(box);

        //Perform ajax call
        box.find(".box-body").load(settings.source, function () {
          done(box);
        });
      });
    });

    function start(box) {
      //Add overlay and loading img
      box.append(overlay);

      settings.onLoadStart.call(box);
    }

    function done(box) {
      //Remove overlay and loading img
      box.find(overlay).remove();

      settings.onLoadDone.call(box);
    }

  };

})(jQuery);

 /*
 * EXPLICIT BOX CONTROLS
 * -----------------------
 * This is a custom plugin to use with the component BOX. It allows you to activate
 * a box inserted in the DOM after the app.js was loaded, toggle and remove box.
 *
 * @type plugin
 * @usage $("#box-widget").activateBox();
 * @usage $("#box-widget").toggleBox();
 * @usage $("#box-widget").removeBox();
 */
(function ($) {

  'use strict';

  $.fn.activateBox = function () {
    $.AdminLTE.boxWidget.activate(this);
  };

  $.fn.toggleBox = function(){
    var button = $($.AdminLTE.boxWidget.selectors.collapse, this);
    $.AdminLTE.boxWidget.collapse(button);
  };

  $.fn.removeBox = function(){
    var button = $($.AdminLTE.boxWidget.selectors.remove, this);
    $.AdminLTE.boxWidget.remove(button);
  };

})(jQuery);

/*
 * TODO LIST CUSTOM PLUGIN
 * -----------------------
 * This plugin depends on iCheck plugin for checkbox and radio inputs
 *
 * @type plugin
 * @usage $("#todo-widget").todolist( options );
 */
(function ($) {

  'use strict';

  $.fn.todolist = function (options) {
    // Render options
    var settings = $.extend({
      //When the user checks the input
      onCheck: function (ele) {
        return ele;
      },
      //When the user unchecks the input
      onUncheck: function (ele) {
        return ele;
      }
    }, options);

    return this.each(function () {

      if (typeof $.fn.iCheck != 'undefined') {
        $('input', this).on('ifChecked', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          settings.onCheck.call(ele);
        });

        $('input', this).on('ifUnchecked', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          settings.onUncheck.call(ele);
        });
      } else {
        $('input', this).on('change', function () {
          var ele = $(this).parents("li").first();
          ele.toggleClass("done");
          if ($('input', ele).is(":checked")) {
            settings.onCheck.call(ele);
          } else {
            settings.onUncheck.call(ele);
          }
        });
      }
    });
  };
}(jQuery));

/**
 * Insight search plugin
 * @author PPOffice { @link https://github.com/ppoffice }
 */
(function ($, CONFIG) {
  var $main = $('.ins-search');
  var $input = $main.find('.ins-search-input');
  var $wrapper = $main.find('.ins-section-wrapper');
  var $container = $main.find('.ins-section-container');
  $main.parent().remove('.ins-search');
  $('body').append($main);

  function section (title) {
      return $('<section>').addClass('ins-section')
          .append($('<header>').addClass('ins-section-header').text(title));
  }

  function searchItem (icon, title, slug, preview, url) {
      return $('<div>').addClass('ins-selectable').addClass('ins-search-item')
          .append($('<header>').append($('<i>').addClass('fa').addClass('fa-' + icon)).append(title != null && title != '' ? title : CONFIG.TRANSLATION['UNTITLED'])
              .append(slug ? $('<span>').addClass('ins-slug').text(slug) : null))
          .append(preview ? $('<p>').addClass('ins-search-preview').text(preview) : null)
          .attr('data-url', url);
  }

  function sectionFactory (type, array) {
      var sectionTitle;
      var $searchItems;
      if (array.length === 0) return null;
      sectionTitle = CONFIG.TRANSLATION[type];
      switch (type) {
          case 'POSTS':
          case 'PAGES':
              $searchItems = array.map(function (item) {
                  // Use config.root instead of permalink to fix url issue
                  return searchItem('file', item.title, null, item.content.slice(0, 150), CONFIG.ROOT_URL + item.path);
              });
              break;
          case 'CATEGORIES':
          case 'TAGS':
              $searchItems = array.map(function (item) {
                  return searchItem(type === 'CATEGORIES' ? 'folder' : 'tag', item.name, item.slug, null, item.permalink);
              });
              break;
          default:
              return null;
      }
      return section(sectionTitle).append($searchItems);
  }

  function extractToSet (json, key) {
      var values = {};
      var entries = json.pages.concat(json.posts);
      entries.forEach(function (entry) {
          if (entry[key]) {
              entry[key].forEach(function (value) {
                  values[value.name] = value;
              });
          }
      });
      var result = [];
      for (var key in values) {
          result.push(values[key]);
      }
      return result;
  }

  function parseKeywords (keywords) {
      return keywords.split(' ').filter(function (keyword) {
          return !!keyword;
      }).map(function (keyword) {
          return keyword.toUpperCase();
      });
  }

  /**
   * Judge if a given post/page/category/tag contains all of the keywords.
   * @param Object            obj     Object to be weighted
   * @param Array<String>     fields  Object's fields to find matches
   */
  function filter (keywords, obj, fields) {
      var result = false;
      var keywordArray = parseKeywords(keywords);
      var containKeywords = keywordArray.filter(function (keyword) {
          var containFields = fields.filter(function (field) {
              if (!obj.hasOwnProperty(field))
                  return false;
              if (obj[field].toUpperCase().indexOf(keyword) > -1)
                  return true;
          });
          if (containFields.length > 0)
              return true;
          return false;
      });
      return containKeywords.length === keywordArray.length;
  }

  function filterFactory (keywords) {
      return {
          POST: function (obj) {
              return filter(keywords, obj, ['title', 'text']);
          },
          PAGE: function (obj) {
              return filter(keywords, obj, ['title', 'text']);
          },
          CATEGORY: function (obj) {
              return filter(keywords, obj, ['name', 'slug']);
          },
          TAG: function (obj) {
              return filter(keywords, obj, ['name', 'slug']);
          }
      };
  }

  /**
   * Calculate the weight of a matched post/page/category/tag.
   * @param Object            obj     Object to be weighted
   * @param Array<String>     fields  Object's fields to find matches
   * @param Array<Integer>    weights Weight of every field
   */
  function weight (keywords, obj, fields, weights) {
      var value = 0;
      parseKeywords(keywords).forEach(function (keyword) {
          var pattern = new RegExp(keyword, 'img'); // Global, Multi-line, Case-insensitive
          fields.forEach(function (field, index) {
              if (obj.hasOwnProperty(field)) {
                  var matches = obj[field].match(pattern);
                  value += matches ? matches.length * weights[index] : 0;
              }
          });
      });
      return value;
  }

  function weightFactory (keywords) {
      return {
          POST: function (obj) {
              return weight(keywords, obj, ['title', 'text'], [3, 1]);
          },
          PAGE: function (obj) {
              return weight(keywords, obj, ['title', 'text'], [3, 1]);
          },
          CATEGORY: function (obj) {
              return weight(keywords, obj, ['name', 'slug'], [1, 1]);
          },
          TAG: function (obj) {
              return weight(keywords, obj, ['name', 'slug'], [1, 1]);
          }
      };
  }

  function search (json, keywords) {
      var WEIGHTS = weightFactory(keywords);
      var FILTERS = filterFactory(keywords);
      var posts = json.posts;
      var pages = json.pages;
      var tags = extractToSet(json, 'tags');
      var categories = extractToSet(json, 'categories');
      return {
          posts: posts.filter(FILTERS.POST).sort(function (a, b) { return WEIGHTS.POST(b) - WEIGHTS.POST(a); }).slice(0, 5),
          pages: pages.filter(FILTERS.PAGE).sort(function (a, b) { return WEIGHTS.PAGE(b) - WEIGHTS.PAGE(a); }).slice(0, 5),
          categories: categories.filter(FILTERS.CATEGORY).sort(function (a, b) { return WEIGHTS.CATEGORY(b) - WEIGHTS.CATEGORY(a); }).slice(0, 5),
          tags: tags.filter(FILTERS.TAG).sort(function (a, b) { return WEIGHTS.TAG(b) - WEIGHTS.TAG(a); }).slice(0, 5)
      };
  }

  function searchResultToDOM (searchResult) {
      $container.empty();
      for (var key in searchResult) {
          $container.append(sectionFactory(key.toUpperCase(), searchResult[key]));
      }
  }

  function scrollTo ($item) {
      if ($item.length === 0) return;
      var wrapperHeight = $wrapper[0].clientHeight;
      var itemTop = $item.position().top - $wrapper.scrollTop();
      var itemBottom = $item[0].clientHeight + $item.position().top;
      if (itemBottom > wrapperHeight + $wrapper.scrollTop()) {
          $wrapper.scrollTop(itemBottom - $wrapper[0].clientHeight);
      }
      if (itemTop < 0) {
          $wrapper.scrollTop($item.position().top);
      }
  }

  function selectItemByDiff (value) {
      var $items = $.makeArray($container.find('.ins-selectable'));
      var prevPosition = -1;
      $items.forEach(function (item, index) {
          if ($(item).hasClass('active')) {
              prevPosition = index;
              return;
          }
      });
      var nextPosition = ($items.length + prevPosition + value) % $items.length;
      $($items[prevPosition]).removeClass('active');
      $($items[nextPosition]).addClass('active');
      scrollTo($($items[nextPosition]));
  }

  function gotoLink ($item) {
      if ($item && $item.length) {
          location.href = $item.attr('data-url');
      }
  }
  if(CONFIG){
    $.getJSON(CONFIG.CONTENT_URL, function (json) {
        if (location.hash.trim() === '#ins-search') {
            $main.addClass('show');
        }
        $input.on('input', function () {
            var keywords = $(this).val();
            searchResultToDOM(search(json, keywords));
        });
        $input.trigger('input');
    });


    $(document).on('click focus', CONFIG.INPUTSELECTOR, function () {
        $main.addClass('show');
        $main.find('.ins-search-input').focus();
    }).on('click', '.ins-search-item', function () {
        gotoLink($(this));
    }).on('click', '.ins-close', function () {
        $main.removeClass('show');
    }).on('keydown', function (e) {
        if (!$main.hasClass('show')) return;
        switch (e.keyCode) {
            case 27: // ESC
                $main.removeClass('show'); break;
            case 38: // UP
                selectItemByDiff(-1); break;
            case 40: // DOWN
                selectItemByDiff(1); break;
            case 13: //ENTER
                gotoLink($container.find('.ins-selectable.active').eq(0)); break;
        }
    });
  }
})(jQuery, window.INSIGHT_CONFIG);

/*
 * OTHER CUSTOM PLUGIN
 * -----------------------
 */
(function($){

  $("html").niceScroll();

  //jQuery UI sortable for the todo list
  $(".todo-list").sortable({
    placeholder: "sort-highlight",
    handle: ".handle",
    forcePlaceholderSize: true,
    zIndex: 999999
  });

  $("#calendar").datepicker({
    todayHighlight: true,
    language: "zh-CN"
  });

  // Caption
  $('.article-entry').each(function(i){
      $(this).find('img').each(function(){
          if ($(this).parent().hasClass('fancybox')) {
              return;
          }
          var alt = this.alt;
          if (alt) {
              $(this).after('<span class="caption">' + alt + '</span>');
          }

          $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
      });

      $(this).find('.fancybox').each(function(){
          $(this).attr('rel', 'article' + i);
      });
  });
  if ($.fancybox){
      $('.fancybox').fancybox();
  }

  // To Comment
  if ($('#comments').length) {
    $('.to-comment').show();
  }

  // Setting skin
  function change_skin(cls) {
    var my_skins = [
      "skin-blue",
      "skin-black",
      "skin-red",
      "skin-yellow",
      "skin-purple",
      "skin-green",
      "skin-blue-light",
      "skin-black-light",
      "skin-red-light",
      "skin-yellow-light",
      "skin-purple-light",
      "skin-green-light"
    ];
    $.each(my_skins, function (i) {
      $("body").removeClass(my_skins[i]);
    });

    $("body").addClass(cls);
    return false;
  }

  if(get("skin")){
    change_skin(get("skin"));
  }else{
    store("skin","skin-yellow");
    change_skin(get("skin"));
  }

  $('#skins-list').on('click','li',function(e){
    var skin = $(this).find('p').data("skin");
    remove("skin")
    store("skin",skin);
    change_skin(get("skin"));
  })
})(jQuery);
