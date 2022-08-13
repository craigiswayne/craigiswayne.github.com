Also see here:
https://stackoverflow.com/questions/1699796/best-way-to-do-multiple-constructors-in-php
https://gist.github.com/AndroxxTraxxon/6bb8bd370c6b7ad9f48ccd612c7b5d83

```
<?php
class YourSpecialClass {
	public $yourClasProp = 'some-default-value';

	
	public function __construct($obj) {
		if(!$obj){
			return;
		}
		
		$thisProps = array_keys(get_object_vars($this));

		foreach (((object)$obj) as $key => $value) {
			if(!isset($value)){
				return;
			}
			
			if(!in_array($key, $thisProps)){
				return;
			}
			
			$this->$key = $value;
		}
	}
}
```
