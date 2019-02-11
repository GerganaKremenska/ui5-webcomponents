import KeyCodes from "@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes";
import Function from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/Function";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import ListItemType from "./types/ListItemType";
import ListMode from "./types/ListMode";
import ListItemBase from "./ListItemBase";
import "./RadioButton";
import "./CheckBox";
import "./Button";

// Styles
import belize from "./themes/sap_belize/ListItem.less";
import belizeHcb from "./themes/sap_belize_hcb/ListItem.less";
import fiori3 from "./themes/sap_fiori_3/ListItem.less";

ShadowDOM.registerStyle("sap_belize", "ListItem.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "ListItem.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "ListItem.css", fiori3);

/**
 * @public
 */
const metadata = {
	"abstract": true,
	properties: /** @lends  sap.ui.webcomponents.main.ListItem.prototype */ {

		/**
		 * Defines the selected state of the <code>ListItem</code>.
		 * @type {boolean}
		 * @public
		 */
		selected: {
			type: Boolean,
		},

		/**
		 * Defines the visual indication and behavior of the list items.
		 * Available options are <code>Active</code> and <code>Inactive</code>.
		 * @type {string}
		 * @public
		*/
		type: {
			type: ListItemType,
			defaultValue: ListItemType.Inactive,
		},

		_active: {
			type: Boolean,
		},

		_mode: {
			type: ListMode,
			defaultValue: ListMode.None,
		},

		_selectionControl: {
			type: Object,
		},

		_fnOnDelete: {
			type: Function,
		},
	},
	events: {
		_press: {},
		_detailPress: {},
		_focused: {},
		_focusForward: {},
	},
};

/**
 * @class
 * A class to serve as a base
 * for the <code>StandardListItem</code> and <code>CustomListItem</code> classes.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ListItem
 * @extends ListItemBase
 * @public
 */
class ListItem extends ListItemBase {
	static get metadata() {
		return metadata;
	}

	constructor(state) {
		super(state);

		this._fnOnDelete = this.onDelete.bind(this);
	}

	onBeforeRendering() {}

	onkeydown(event) {
		const spaceUsed = event.which === KeyCodes.SPACE;
		const enterUsed = event.which === KeyCodes.ENTER;
		const itemActive = this.type === ListItemType.Active;

		if (spaceUsed) {
			event.preventDefault();
		}

		if ((spaceUsed || enterUsed) && itemActive) {
			this.activate();
		}

		if (enterUsed) {
			this.fireItemPress();
		}
	}

	onkeyup(event) {
		const spaceUsed = event.which === KeyCodes.SPACE;
		const enterUsed = event.which === KeyCodes.ENTER;

		if (spaceUsed || enterUsed) {
			this.deactivate();
		}

		if (spaceUsed) {
			this.fireItemPress();
		}
	}

	ondown(event) {
		if (event.isMarked === "button") {
			return;
		}
		this.activate();
	}

	onup(event) {
		if (event.isMarked === "button") {
			return;
		}
		this.deactivate();
	}

	onfocusout(event) {
		this.deactivate();
	}

	ontap(event) {
		if (event.isMarked === "button") {
			return;
		}
		this.fireItemPress();
	}

	activate() {
		if (this.type === ListItemType.Active) {
			this._active = true;
		}
	}

	deactivate() {
		this._active = false;
	}

	onDelete(event) {
		this.fireEvent("_selectionRequested", { item: this, selected: event.selected });
	}

	fireItemPress() {
		this.fireEvent("_press", { item: this, selected: this.selected });
	}
}

export default ListItem;
