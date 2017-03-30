# Module: mmm-wu-moonphase
The `mmm-wu-moonphase` module is a modules of the MagicMirror. This module displays the current moon phase, including a picture of the current moon and the percentage illumination.


### Installation

In your terminal, go to your MagicMirror's Module folder:

```
cd ~/MagicMirror/modules
```

Clone this repository:

```
git clone https://github.com/raffaelloit/mmm-wu-moonphase.git
```


Add some [config entries](#configuration) to your config.js file. After that the content will be added to your mirror.

### Using the module

Get und set your API from wunderground.com and set your location and preferred language.

Now add the module to the modules array in the `config/config.js` file:
````javascript
modules: [
        {
                module: 'mmm-wu-moonphase',
                header: 'Current Moon Phase',   // optionally you can add a header to this block
                position: 'top_right',  // this can be any of the regions.   
		              config: {
                      // See 'Configuration options' for more information.
                      apikey: 'abcde12345abcde12345abcde12345ab',
                      country: 'Switzerland',
                      city: 'Bern',
                      apiLang: 'EN',
				
                }
        },
]
````

### Configuration

The following properties can be configured:


<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>	
		<tr>
			<td><code>apikey</code></td>
			<td>The <a href="https://www.wunderground.com/" target="_blank">Weatherunderground</a> API key, which can be obtained by creating an Weather Underground account.<br>
				<br>This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>country</code></td>
			<td>Search your country under <a href="https://www.wunderground.com">Weather Underground</a> <b>This will override the default value <code>Switzerland</code>.<br>
				<br><b>Example:</b> <code>United Kingdom</code>
				<br><b>Default value:</b> <code>Switzerland</code><br>
				<br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>city</code></td>
			<td>Search your city under  <a href="https://www.wunderground.com">Weather Underground</a> <b>This will override the default value <code>Bern</code>.<br>
				<br><b>Example:</b> <code>London</code>
				<br><b>Default value:</b> <code>Bern</code><br>
				<br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>moonSize</code></td>
			<td>Set your desierd size of the moon picture. (Obs: The original picture size from WU is 48*48px) <b>This will override the default value <code>70</code>.<br>
				<br><b>Example:</b> <code>50</code>
				<br><b>Default value:</b> <code>70</code><br>
			</td>
		</tr>
		<tr>
			<td><code>showPhaseText</code></td>
			<td>Set to true/false to show/hide the moon phase text above the moon picture. <b>This will override the default value <code>true</code>.<br>
				<br><b>Example:</b> <code>false</code>
				<br><b>Default value:</b> <code>true</code><br>
			</td>
		</tr>
		<tr>
			<td><code>showPercentText</code></td>
			<td>Set to true/false to show/hide the percent illuminated text under the moon picture. <b>This will override the default value <code>true</code>.<br>
				<br><b>Example:</b> <code>false</code>
				<br><b>Default value:</b> <code>true</code><br>
			</td>
		</tr>
		<tr>
			<td><code>apiLang</code></td>
			<td>The apiLang define the language of the json query. See <a href="https://www.wunderground.com/weather/api/d/docs?d=language-support">Weather Underground language support</a><br>
				<br><b>Possible values:</b> <code>DL</code>
				<br><b>Default value:</b> <code>EN</code>
			</td>
		</tr>
		<tr>
			<td><code>updateInterval</code></td>
			<td>How often does the content needs to be fetched? Depends on your API WU plan. (Milliseconds)<br>
				<br><b>Default value:</b> <code>10800 * 1000</code> (3 houres)
			</td>
		</tr>
		<tr>
			<td><code>animationSpeed</code></td>
			<td>Speed of the update animation. (Milliseconds)<br>
				<br><b>Default value:</b> <code>2000</code> (2 seconds)
			</td>
		</tr>
		<tr>
			<td><code>initialLoadDelay</code></td>
			<td>The initial delay before loading. If you have multiple modules that use the same API key, you might want to delay one of the requests. (Milliseconds)<br>
				<br><b>Default value:</b>  <code>0</code>
			</td>
		</tr>
			<tr>
			<td><code>rentryDelay</code></td>
			<td>The delay before retrying after a request failure. (Milliseconds)<br>
				<br><b>Default value:</b>  <code>2500</code>
			</td>
		</tr>
		<tr>
			<td><code>apiBase</code></td>
			<td>The OpenWeatherMap base URL.<br>
				<br><b>Default value:</b>  <code>'http://api.wunderground.com/api'</code>
			</td>
		</tr>
		<tr>
			<td><code>weatherEndpoint</code></td>
			<td>The Weather Underground API endPoint.<br>
				<br><b>Default value:</b>  <code>'.json'</code>
			</td>
		</tr>
	</tbody>
</table>
