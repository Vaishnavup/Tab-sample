
var tabsModel = {
    tabs: [],
    addTab: function() {
        var tabCount = this.tabs.length + 1;
        this.tabs.push({ id: tabCount, url: '' });
        return tabCount;
    },
    removeTab: function(tabId) {
        var index = this.tabs.findIndex(tab => tab.id === tabId);
        if (index !== -1) {
            this.tabs.splice(index, 1);
        }
    },
    updateTabUrl: function(tabId, url) {
        var tab = this.tabs.find(tab => tab.id === tabId);
        if (tab) {
            tab.url = url;
        }
    },
    getTabs: function() {
        return this.tabs;
    }
};

var tabsView = {
    init: function() {
        $('#add-tab').on('click', function() {
            var tabId = controller.addTab();
            tabsView.renderTabs(controller.getTabs(), tabId);
        });

        $('#tabs').on('click', '.tab', function() {
            var tabId = $(this).data('tab-id');
            controller.switchTab(tabId);
        });

        $('#tabs').on('click', '.close-tab', function(event) {
            event.stopPropagation();
            var tabId = $(this).parent().data('tab-id');
            controller.removeTab(tabId);
        });

        $('#url-input').keypress(function(event) {
            if (event.which == 13) {
                var url = $(this).val();
                var activeTabId = $('.tab.active').data('tab-id');
                controller.updateTabUrl(activeTabId, url);
                $('#content-iframe').attr('src', url);
            }
        });
    },
    renderTabs: function(tabs, activeTabId) {
        $('#tabs').empty();
        tabs.forEach(function(tab) {
            var tabElement = $('<div class="tab">Tab ' + tab.id + ' <button class="close-tab">x</button></div>');
            if (tab.id === activeTabId) {
                tabElement.addClass('active');
            }
            tabElement.data('tab-id', tab.id);
            $('#tabs').append(tabElement);
        });
    }
};


var controller = {
    init: function() {
        tabsView.init();
        this.addTab();
    },
    addTab: function() {
        return tabsModel.addTab();
    },
    removeTab: function(tabId) {
        tabsModel.removeTab(tabId);
        tabsView.renderTabs(tabsModel.getTabs());
    },
    switchTab: function(tabId) {
        $('.tab').removeClass('active');
        $('[data-tab-id="' + tabId + '"]').addClass('active');
    },
    updateTabUrl: function(tabId, url) {
        tabsModel.updateTabUrl(tabId, url);
    },
    getTabs: function() {
        return tabsModel.getTabs();
    }
};

$(document).ready(function() {
    controller.init();
});
