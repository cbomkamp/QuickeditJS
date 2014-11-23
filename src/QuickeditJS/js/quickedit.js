//"use strict";

//quickedit = new function () {
//    this.init = function () {
//        $(".quickedit-container").each(function () {
//            var quickedit = new Quickedit(this);
//        });

//        $(document).on("keyup", ".quickedit-editor", function (e) {
//            e.preventDefault();

//            if (e.keyCode === 27) {
//                var quickedit = Quickedit.get(this);
//                quickedit.cancel();
//            }
//        });

//        $(document).on("click", ".quickedit-edit", function (e) {
//            e.preventDefault();

//            var quickedit = Quickedit.get(this);
//            quickedit.edit();
//        });

//        $(document).on("click", ".quickedit-cancel", function (e) {
//            e.preventDefault();

//            var quickedit = Quickedit.get(this);
//            quickedit.cancel();
//        });

//        $(document).on("click", ".quickedit-save", function (e) {
//            e.preventDefault();

//            var quickedit = Quickedit.get(this);
//            quickedit.save();
//        });
//    };
//};

//Quickedit = function (container) {
//    this.mode = "view";
//    this.container = container;
//    this.viewerDiv = $(container).find(".quickedit-viewer");
//    this.editorDiv = $(container).find(".quickedit-editor");

//    this.originalEditorContent = $(this.editorDiv).html();

//    this.onsave = function (c, d) {
//        $(c).children(".quickedit-viewer").html(d);
//    };

//    var onsaveData = $(container).data("quickeditOnsave");

//    if (typeof onsaveData !== "undefined") {
//        this.onsave = eval(onsaveData);
//    }

//    // set a unique id for the container, if it doesn't already have one
//    if ($(container)[0].id.length === 0) {
//        $(container)[0].id = "quickedit-container-" + Math.floor(Math.random() * 1E16);
//    }

//    $(container).data("quickedit", this);

//    var elements = $(container).find(".quickedit-viewer,.quickedit-editor,.quickedit-edit,.quickedit-cancel,.quickedit-save");

//    $(elements).each(function () {
//        $(this).data("quickeditContainerId", $(container)[0].id);
//    });
//};

//Quickedit.get = function (element) {
//    var container = $("#" + $(element).data("quickeditContainerId"));
//    return $(container).data("quickedit");
//};

//Quickedit.prototype.isInEditMode = function () {
//    return this.mode === "edit";
//};

//Quickedit.prototype.isInViewMode = function () {
//    return this.mode === "view";
//};

//Quickedit.prototype.switchToEditMode = function () {
//    this.mode = "edit";
//    this.viewerDiv.hide();
//    this.editorDiv.show();

//    var autofocusInput = $('input[autofocus]');

//    if ($(autofocusInput).length) {
//        autofocusInput.focus();
//        $(autofocusInput)[0].selectionStart = $(autofocusInput)[0].selectionEnd = autofocusInput.val().length;
//    }
//};

//Quickedit.prototype.switchToViewMode = function () {
//    this.mode = "view";
//    this.viewerDiv.show();
//    this.editorDiv.hide();
//};

//Quickedit.prototype.edit = function () {
//    this.switchToEditMode();
//};

//Quickedit.prototype.cancel = function () {
//    this.switchToViewMode();

//    var forms = $(this.editorDiv).find("form");

//    if (forms.length) {
//        var form = $(forms[0]);
//        form[0].reset();
//    }
//};

//Quickedit.prototype.save = function () {
//    var self = this;

//    var forms = $(this.editorDiv).find("form");

//    if (forms.length) {
//        var form = $(forms[0]);

//        if (form.validator && !form.valid()) {
//            return false;
//        }

//        form.submit(function (ev) {
//            $.ajax({
//                type: form.attr('method'),
//                url: form.attr('action'),
//                data: form.serialize()
//            }).done(function (data) {
//                // set the form values to their current values so if edit is cancelled, they reset to the current values
//                $(form).find(":input").each(function () {
//                    $(this)[0].setAttribute('value', $(this).val());
//                });

//                self.switchToViewMode();

//                if (typeof self.onsave !== 'undefined') {
//                    self.onsave(self.container, data);
//                }

//                // re-initialize quickedit as the viewer may have been replaced
//                quickedit.init();
//            }).fail(function () {
//                // Optionally alert the user of an error here...
//                console.log('fail');
//            });

//            ev.preventDefault();
//        });

//        form.submit();
//    }
//};

