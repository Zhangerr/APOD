/**
 * Used in the {@link Ext.tab.Bar} component. This shouldn't be used directly, instead use
 * {@link Ext.tab.Bar} or {@link Ext.tab.Panel}.
 * @private
 */
Ext.define('Ext.tab.Tab', {
    extend: 'Ext.Button',
    xtype: 'tab',
    alternateClassName: 'Ext.Tab',

    // @private
    isTab: true,

    config: {
        // @inherit
        baseCls: Ext.baseCSSPrefix + 'tab',

        /**
         * @cfg {String} pressedCls
         * The CSS class to be applied to a Tab when it is pressed. Defaults to 'x-tab-pressed'.
         * Providing your own CSS for this class enables you to customize the pressed state.
         * @accessor
         */
        pressedCls: Ext.baseCSSPrefix + 'tab-pressed',

        /**
         * @cfg {String} activeCls
         * The CSS class to be applied to a Tab when it is active. Defaults to 'x-tab-active'.
         * Providing your own CSS for this class enables you to customize the active state.
         * @accessor
         */
        activeCls: Ext.baseCSSPrefix + 'tab-active',

        /**
         * @cfg {Boolean} active
         * Set this to true to have the tab be active by default.
         * @accessor
         */
        active: false,

        /**
         * @cfg {String} title
         * The title of the card that this tab is bound to.
         * @accessor
         */
        title: '&nbsp;'
    },

    // We need to override this so the iconElement is properly hidden using visibilty
    // when we render it.
    template: [
        {
            tag: 'span',
            reference: 'badgeElement',
            hidden: true
        },
        {
            tag: 'span',
            className: Ext.baseCSSPrefix + 'button-icon',
            reference: 'iconElement',
            style: 'visibility: hidden !important'
        },
        {
            tag: 'span',
            reference: 'textElement',
            hidden: true
        }
    ],

    /**
     * @event activate
     * Fires when a tab is activated
     * @param {Ext.tab.Tab} this
     */

    /**
     * @event deactivate
     * Fires when a tab is deactivated
     * @param {Ext.tab.Tab} this
     */

     // @inherit
    updateTitle: function(title) {
        this.setText(title);
    },

    // @inherit
    hideIconElement: function() {
        this.iconElement.dom.style.setProperty('visibility', 'hidden', '!important');
    },

    // @inherit
    showIconElement: function() {
        this.iconElement.dom.style.setProperty('visibility', 'visible', '!important');
    },

    // @inherit
    updateActive: function(active, oldActive) {
        var activeCls = this.getActiveCls();
        if (active && !oldActive) {
            this.element.addCls(activeCls);
            this.fireEvent('activate', this);
        } else if (oldActive) {
            this.element.removeCls(activeCls);
            this.fireEvent('deactivate', this);
        }
    }
}, function() {
    this.override({
        activate: function() {
            this.setActive(true);
        },

        deactivate: function() {
            this.setActive(false);
        }
    });
});
