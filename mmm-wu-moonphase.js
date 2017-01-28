/* Module for Moon phase */

/* Magic Mirror
 * Module: Moon phase based on CurrentWeather
 * 
 * Written by Raffaello Gruosso http://raffael.lo.it
 * Oringinal by Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 * 
 */

Module.register("mmm-wu-moonphase",{
    
	// Default module config.
	defaults: {
				apikey: "", // Set or get your API under https://www.wunderground.com/weather/api/d/pricing.html
				country: "Switzerland", // Search your country under https://www.wunderground.com/
				city: "Bern", // See comment country
				apiLang: "EN", // default API language englisch, see https://www.wunderground.com/weather/api/d/docs?d=language-support
				updateInterval: 10800 * 1000, // every 3 houres
				animationSpeed: 1000,				
				initialLoadDelay: 0, // 0 seconds delay
				retryDelay: 2500,				                
				apiBase: "http://api.wunderground.com/api", // URL string for json query
				moonEndpoint: ".json", // URL Endpoint for json query
		},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);

		this.percentIlluminated = null;
		this.ageOfMoon = null;
		this.phaseofMoon = null;
		//this.hemisphere = null;

		this.loaded = false;
		this.scheduleUpdate(this.config.initialLoadDelay);

		this.updateTimer = null;

	},    

	// Define required translations.
	getTranslations: function () {
        return {
            en: "translations/en.json",
            de: "translations/de.json",
            dl: "translations/de.json",
            it: "translations/it.json",
            sv: "translations/sv.json"
        };
    },
    
	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");

		if (this.config.apikey === "") {
			wrapper.innerHTML = this.translate("APIKEY") + this.name + ".";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (this.config.country === "") {
			wrapper.innerHTML = this.translate("APICTRY") + this.name + ".";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (this.config.city === "") {
			wrapper.innerHTML = this.translate("APICITY") + this.name + ".";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		if (!this.loaded) {
			wrapper.innerHTML = this.translate("LOAD");
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		var small = document.createElement("div");
		small.className = "light small";

		var phaseofMoon = document.createElement("div");
		phaseofMoon.innerHTML = " " + this.phaseofMoon;
		small.appendChild(phaseofMoon);

		var src = "https://www.wunderground.com/graphics/moonpictsnew/moon" + this.ageOfMoon + ".gif";
        var style = "align='center';";
        var img = "<img height='70' width='70' src='" + src + "' style='" + style + "'>";

        var moonIcon = document.createElement("div");
        moonIcon.innerHTML = img;
        small.appendChild(moonIcon);

        var percentIlluminated = document.createElement("div");
		percentIlluminated.innerHTML = this.percentIlluminated + " % "+ this.translate("ILLUM");
		small.appendChild(percentIlluminated);

		wrapper.appendChild(small);
		return wrapper;
	},

	/* updateMoonphase(compliments)
	 * Requests new data from wunderground.com.
	 * Calls processMoonphase on succesfull response.
	 */
	updateMoonphase: function() {
		var url = this.config.apiBase + this.getParams();
		var self = this;
		var retry = true;

		var moonphaseRequest = new XMLHttpRequest();
		moonphaseRequest.open("GET", url, true);
		moonphaseRequest.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.processMoonphase(JSON.parse(this.response));
				} else if (this.status === 401) {
					self.config.appid = "";
					self.updateDom(self.config.animationSpeed);

					Log.error(self.name + ": Incorrect APPID.");
					retry = false;
				} else {
					Log.error(self.name + ": Could not load moonphase.");
				}

				if (retry) {
					self.scheduleUpdate((self.loaded) ? -1 : self.config.retryDelay);
				}
			}
		};
		moonphaseRequest.send();
	},

	/* getParams(compliments)
	 * Generates an url with api parameters based on the config.
	 *
	 * return String - URL params.
	 */
	getParams: function() {
		var params = "/";
                params += this.config.apikey + "/astronomy/lang:";
				params += this.config.apiLang + "/q/";
				params += this.config.country + "/";
                params += this.config.city;
                params += this.config.moonEndpoint;

		return params;
	},

	/* processMoonphase(data)
	 * Uses the received data to set the various values.
	 *
	 * argument data object - Moon phase information received form wunderground.com.
	 */
	processMoonphase: function(data) {
		this.percentIlluminated = data.moon_phase.percentIlluminated;
		this.ageOfMoon = data.moon_phase.ageOfMoon;
		this.phaseofMoon = data.moon_phase.phaseofMoon;
		
		this.loaded = true;
		this.updateDom(this.config.animationSpeed);
	},

	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update. If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		setTimeout(function() {
			self.updateMoonphase();
		}, nextLoad);
	},
});
