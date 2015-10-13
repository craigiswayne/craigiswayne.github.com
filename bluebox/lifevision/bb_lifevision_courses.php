<?php
	class bb_lifevision_courses extends baseclass {
		var $_id;

		var $name;
		var $summary;
		var $description;
		var $display_orderNUM;
		var $imageISfile;

		var $_deleted;
		var $_authorid;
		var $_dateadded;
		var $_modifierid;
		var $_datemodified;

		var $bbsetting_dynamic_plugin_classes = array('bb_lifevision_courses_pricing', 'bb_lifevision_courses_files','bb_lifevision_courses_categories_link');
		var $bbsetting_required_fields = array('name');
		var $bbsetting_skip_permissions = array('showPrice','show_courses_list','show_category_list','course_content_page','my_courses_list');
		var $bbsetting_addmenu="- <a href=/?class=bb_lifevision_courses_categories>Categories</a>";
		var $bbsetting_module_name="Courses";

		public function getPrice($courseID, $subTypeID=null) {
			$_pricing = new bb_lifevision_courses_pricing();
			$_sub_types = new bb_lifevision_subscriptions_types();

			if ($subTypeID) {
				$subType = $_sub_types->get(array('where' => '_id = ' . SQLStr($subTypeID)));
			} else {
				$subType = $_sub_types->get(array('where' => 'defaultYN = 1'));
			}

			if ($pricing = $_pricing->get(array('where' => 'courseISbb_lifevision_coursesID = ' . SQLStr($courseID) . ' AND sub_typeISbb_lifevision_subscriptions_typesID = ' . SQLStr($subType['_id'])))) {
				return $pricing;
			} else {
				exit_error('No pricing found for course ID: ' . $courseID);
			}
		}

		public function showPrice($conf=array()) {
			resp($this->getPrice($conf['where']));
		}

		public function show_courses_list() {
			global $global;
			//
			$cat_where="";
			$cat_name="";
			if($global[cat]) {
				$course_cat = new bb_lifevision_courses_categories();
				$course_cat = $course_cat->get(array("where"=>"_deleted!=1 and _id=$global[cat]"));
				if($course_cat[_id]){
					$cat_where =" and _id IN (
						select
						courseISbb_lifevision_coursesID
						from
						bb_lifevision_courses_categories_link
						where
						bb_lifevision_courses_categories_link._deleted!=1 and
						bb_lifevision_courses_categories_link.categoryISbb_lifevision_courses_categoriesID IN ($course_cat[_id])
					)
					";
					$cat_name="$course_cat[name]";
				}else{
					resp("<h2> <a href=\"/?courses\">Course Categories</a> - <a href=\"/?courses&global[cat]=$course_cat[_id]\">No Course Category Found</a> </h2>");
					$global['engine']->show(array('template' => 'bb_lifevision_courses-view_public.empty', 'data' => array() ));
					return;
				}
				//
				resp("<h2> <a href=\"/?courses\">Course Categories</a> - <a href=\"/?courses&global[cat]=$course_cat[_id]\">$cat_name Courses</a> </h2>");
				$courses=$this->getlist(array("where"=>"_deleted!=1 $cat_where","order"=>"display_orderNUM asc, _id asc"));
				if($courses) {
					foreach($courses as $course) {
						$price=$this->getPrice($course[_id],null);
						//$course[course_price]=display_currency($price);
						$shopping=new bb_shopping();
						$course[course_price]=$shopping->printCurrency(array("where"=>$price['priceCUR'],"return_data"=>1));
						$course[subscription]=item_display_value(array("subscription_typeISbb_lifevision_subscriptions_typesID",$price['sub_typeISbb_lifevision_subscriptions_typesID']));
						$global['engine']->show(array('template' => 'bb_lifevision_courses-view_public', 'data' => $course));
					}
				}else{
					$global['engine']->show(array('template' => 'bb_lifevision_courses-view_public.empty', 'data' => array() ));
				}
				//
			}else{
				$category_list = $this->show_category_list();
				resp("$category_list");
				return;
			}
			//
			return;
		}

		public function show_category_list() {
			global $global;
			$out="";
			//
			$out.="<h2><a href=\"/?courses\">Course Categories</a></h2>";
			$course_cats = new bb_lifevision_courses_categories();
			$course_cats = $course_cats->getlist(array("where"=>"_deleted!=1 and refers_toISbb_lifevision_courses_categoriesID IS NULL","order"=>"display_orderNUM asc, _id asc"));
			if($global[cat]) {
				$out.="<div style=\"text-align:left; margin:10px; cursor:pointer;\" onclick=\"document.location='/?courses';\" >All Courses</div>";
			}
			foreach($course_cats as $cat){
				$out.="<div style=\"text-align:left; margin:10px; cursor:pointer;\" onclick=\"document.location='/?courses&global[cat]=$cat[_id]';\" >$cat[name]</div>";
			}
			//
			return $out;
		}

		public function my_courses_list() {
			global $global;
			//
			$out="";
			//
			if($global[course]){
				$this->course_content_page($global[course]);
				return;
			}
			//
			$out.="<h2>My Courses</h2>";
			//
			$subscriptions=$global[database]->sqlQuery("
				select
				bb_lifevision_subscriptions.*
				from
				bb_lifevision_subscriptions
				join bb_lifevision_courses ON (
					bb_lifevision_courses._deleted!=1
					and  bb_lifevision_courses._id=bb_lifevision_subscriptions.courseISbb_lifevision_coursesID
				)
				where
				bb_lifevision_subscriptions._deleted!=1
				and bb_lifevision_subscriptions.userISbb_usersID=".$_SESSION['user']['_id']."
				and bb_lifevision_subscriptions.start_date <=".sqlstr(date("Y-m-d H:i:s",strtotime(now())))."
				and bb_lifevision_subscriptions.end_date >=".sqlstr(date("Y-m-d H:i:s",strtotime(now())))."

				order by
				bb_lifevision_subscriptions.end_date asc, bb_lifevision_subscriptions.start_date asc, bb_lifevision_courses.display_orderNUM asc, bb_lifevision_subscriptions.courseISbb_lifevision_coursesID asc
			");
			if($subscriptions) {
				foreach($subscriptions as $sub) {
					unset($course);
					$course=$this->get(array("where"=>"_deleted!=1 and _id=$sub[courseISbb_lifevision_coursesID]"));
					if($course) {
						$out.="
							<div style=\"margin:15px 0px; border: 1px dashed ".COLOR1."; padding: 7px;\" >
								".($course[imageISfile]?"<div style=\"float:left; margin-right:20px;\"> <img src=\"$course[imageISfile]\" style=\"max-width:100px; max-height:100px;\"/></div>":"")."

								<div style=\"float:left; width:470px;\">
									<div style=\"margin-top:5px;\">Name: $course[name] </div>
									<div style=\"margin:5px 0px;\">Summary: $course[summary] </div>
									<div style=\"margin:5px 0px;\">Subscription Until: ".date("dS F Y H:i",strtotime("$sub[end_date]"))." </div>
									<div style=\"margin:5px 0px;\"> <a href=/?My_Courses&global[course]=$course[_id]>View Course Content</a></div>
									<div style=\"clear:both;\"></div>
								</div>
								<div style=\"clear:both;\"></div>
							</div>
						";
					}
				}
			}else{
				$out.="You Currently have no active subscriptions.";
			}
			//
			return $out;
		}

		function parse_template($template,$data){
			$template = $template ?: "";
			while(preg_match("/\(#(.*?)#\)/", $template)){
				if (preg_match_all("/\(#(.*?)#\)/", $template, $variables)){
					foreach ($variables[1] as $i => $variable_name){
						$match		= array_key_exists($variable_name,$data) ? $data[$variable_name] : '';
						$match		= is_array($match) ? json_encode($match) : $match;
						$template	= str_replace($variables[0][$i],$match, $template);
					}
				}
			}
			return html_entity_decode($template);
		}

		function course_content_page($course_id){
			global $global;
			//
			$html = '';
			if($course_id){
				$course = new bb_lifevision_courses();
				$course = $course->get(array("where"=>"_deleted!=1 and _id=$course_id"));

				$template_course = "
					<div class=course>
						<div class=header>
							<a class=\"lifevision_button_back button back\" href=\"/?Course-Dashboard\" >Dashboard</a>
							<div class=title>(#name#)</div>
							<img src='(#imageISfile#)' />
						</div>

						<div class=description>(#description#)</div>
						<div class=content>(#linked_files#)</div>
					</div>

					<style>

					</style>
				";

				$template_course_file = "
					<div class=file>
						<div class=title>(#name#)</div>
            <div class=content>(#content#)</div>
					</div>
				";

				$template_error_message = "
					<div class=\"message error\">
						(#message#)
					</div>
				";

				if($course) {
					$course['linked_files'] = "";

					if($_SESSION['user']['_id']) {
						$subscription = new bb_lifevision_subscriptions();
						$subscription = $subscription->get(array("where"=>"_deleted!=1
							and userISbb_usersID=".$_SESSION['user']['_id']."
							and courseISbb_lifevision_coursesID=$course[_id]
							and start_date <=".sqlstr(date("Y-m-d H:i:s",strtotime(now())))."
							and end_date >=".sqlstr(date("Y-m-d H:i:s",strtotime(now())))."
						"));
						if($subscription) {

							if($course[imageISfile]) {

								//resp("<img src=$course[imageISfile] border=0 style=float:left;margin-right:10px; />");
							}
							//resp("<div style=\"margin-bottom:10px;\" >$course[description]</div>");
							//
							$course_files = new bb_lifevision_courses_files();
							$course_files = $course_files->getlist(array("where"=>"_deleted!=1 and courseISbb_lifevision_coursesID=$course[_id]"));
							if($course_files) {
								foreach($course_files as $files) {
									if($files[typeISLIST_Audio_Slide_Video]=="Video") {
										$files['content'] = $files[video_iframeISsmallplaintextbox];
									}elseif(($files[typeISLIST_Audio_Slide_Video]=="Audio") && $files['file']){ //mp3 link
										$files['content'] = "<a href=\"$files[file]\" > <img src='/engine/images/sound.png' border=0 />";
									}elseif(($files[typeISLIST_Audio_Slide_Video]=="Slide") && $files['file']){ //slide link
										$files['content'] = "<a href=\"$files[file]\" > <img src='/engine/images/slides.png' border=0 /> Please click here for file.</a>";
									}
									$course['linked_files'] .= $this->parse_template($template_course_file,$files);
								}

							}
							$template = $this->parse_template($template_course,$course);
              $html = $template;
							//
						}else{
							$html = $this->parse_template($template_error_message, ["message" => "You don't have a valid subscription to see this course's content."]);
						}
					}else{
							$html = $this->parse_template($template_error_message, ["message" => "You must be logged in to access course content."]);
					}
				}else{
					$html = 	"<h2>Course Not Found</h2>";
					$html .= 	"Course cannot be found.";
				}
			}else{
				$html = 	"<h2>Course Not Found</h2>";
				$html .= 	"Course cannot be found.";
			}
			resp($html);
		}
	}

	class bb_lifevision_courses_categories extends baseclass {
		var $_id;

		var $name;
		var $refers_toISbb_lifevision_courses_categoriesID;
		var $display_orderNUM;

		var $_deleted;
		var $_authorid;
		var $_dateadded;
		var $_modifierid;
		var $_datemodified;

		var $bbsetting_required_fields = array('name');
		var $bbsetting_addmenu=" - <a href=/?class=bb_lifevision_courses>Courses</a>";
		var $bbsetting_module_name="Course Categories";
	}

	class bb_lifevision_courses_categories_link extends baseclass {
		var $_id;

		var $categoryISbb_lifevision_courses_categoriesID;
		var $courseISbb_lifevision_coursesID;

		var $_deleted;
		var $_authorid;
		var $_dateadded;
		var $_modifierid;
		var $_datemodified;

		var $bbsetting_required_fields = array('categoryISbb_lifevision_courses_categoriesID','courseISbb_lifevision_coursesID');
		var $bbsetting_addmenu=" - <a href=/?class=bb_lifevision_courses>Courses</a> - <a href=/?class=bb_lifevision_courses_categories>Categories</a> ";
		var $bbsetting_module_name="Courses Categories Link";
	}
?>
