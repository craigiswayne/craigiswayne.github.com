<?php

$host       = 'localhost';
$username   = 'root';
$password   = 'root';
$schema     = 'assessments';
$connection = null;
$table_name = 'tdl_browser_poll';

function send_email(){

  $msg  = 'Date:'.date('j F Y').'\n';
  $msg .= 'Name:'.$_POST['name'].'\n';
  $msg .= 'Browser:'.$_POST['browser'].'\n';
  $msg .= 'Reason:'.$_POST['reason'].'\n';

  mail($_POST['email'],"The Dating Lab | Your Poll Response",$msg);
}

function execute_sql($sql){

  global $connection;
  global $host;
  global $username;
  global $password;
  global $schema;

  if(!$sql){return null;}

  $connection = mysqli_connect($host, $username, $password, $schema);
  if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
  }

  $query  = mysqli_query($connection ,$sql);

  $results = [];
  $last_insert_id = mysqli_insert_id($connection);
  if($last_insert_id > 0){
    $results['_id'] = $last_insert_id;
  }

  if($query && is_object($query)){
    while($row = mysqli_fetch_assoc($query)){
      $results[]=$row;
    }
    $query->close();
  }

  return $results;
}

function overwrite_responses($email){

  $sql = '
    UPDATE tdl_browser_poll
    SET _deleted = 1
    WHERE email="'.$email.'"';
    execute_sql($sql);
}

function add_response(){

  global $table_name;
  global $schema;

  $sql    = 'SELECT * FROM `'.$table_name.'` WHERE email="'.$_POST['email'].'"';
  $result = execute_sql($sql);
  if(sizeof($result) > 0){
    overwrite_responses($_POST['email']);
  }

  $sql = '
    INSERT INTO `'.$schema.'`.`'.$table_name.'` (`name`, `email`, `browser`, `reason`)
    VALUES ("'.$_POST['name'].'","'.$_POST['email'].'","'.$_POST['browser'].'","'.$_POST['reason'].'")
  ';

  execute_sql($sql);

  unset($_POST);
}

function show_all_results(){

  global $schema;
  global $table_name;

  $template = file_get_contents('poll.html');

  $sql = 'SELECT * FROM `'.$schema.'`.`'.$table_name.'` WHERE _deleted!=1 ORDER BY browser, timestamp DESC';
  $result = execute_sql($sql);

  $data = [];

  $data['response_rows'] = '';

  $row_num = 1;
  foreach($result as $row=>$value){

    $data['response_rows'] .= '<tr>';
    $data['response_rows'] .= '<td>'.$row_num.'</td>';
    $data['response_rows'] .= '<td>'.$value['email'].'</td>';
    $data['response_rows'] .= '<td class="name">'.$value['name'].'</td>';
    $data['response_rows'] .= '<td class="browser">'.$value['browser'].'</td>';
    $data['response_rows'] .= '<td>'.$value['reason'].'</td>';
    $data['response_rows'] .= '<td>'.$value['timestamp'].'</td>';
    $data['response_rows'] .= '</tr>';
    $row_num++;
  }

  $sql = 'SELECT COUNT(_id) as `total` FROM `'.$schema.'`.`'.$table_name.'` WHERE _deleted=0';
  $result = execute_sql($sql);
  $data['total_votes'] = intval($result[0]['total']);

  $sql = 'SELECT COUNT(_id) as `votes` FROM `'.$schema.'`.`'.$table_name.'` WHERE _deleted=0 AND browser="internet explorer"';
  $result = execute_sql($sql);
  $data['ie_votes'] = intval($result[0]['votes']);

  $sql = 'SELECT COUNT(_id) as `votes` FROM `'.$schema.'`.`'.$table_name.'` WHERE _deleted=0 AND browser="firefox"';
  $result = execute_sql($sql);
  $data['firefox_votes'] = intval($result[0]['votes']);

  $sql = 'SELECT COUNT(_id) as `votes` FROM `'.$schema.'`.`'.$table_name.'` WHERE _deleted=0 AND browser="chrome"';
  $result = execute_sql($sql);
  $data['chrome_votes'] = intval($result[0]['votes']);

  $sql = 'SELECT COUNT(_id) as `votes` FROM `'.$schema.'`.`'.$table_name.'` WHERE _deleted=0 AND browser="safari"';
  $result = execute_sql($sql);
  $data['safari_votes'] = intval($result[0]['votes']);

  $sql = 'SELECT COUNT(_id) as `votes` FROM `'.$schema.'`.`'.$table_name.'` WHERE _deleted=0 AND browser="opera"';
  $result = execute_sql($sql);
  $data['opera_votes'] = intval($result[0]['votes']);


  $data['ie_percent']       = round(($data['ie_votes']/$data['total_votes'])*100);
  $data['firefox_percent']  = round(($data['firefox_votes']/$data['total_votes'])*100);
  $data['safari_percent']   = round(($data['safari_votes']/$data['total_votes'])*100);
  $data['chrome_percent']   = round(($data['chrome_votes']/$data['total_votes'])*100);
  $data['opera_percent']    = round(($data['opera_votes']/$data['total_votes'])*100);


  echo(parse_template($template,$data));
}

function parse_template($template,$data){

  while(preg_match("/\(#(.*?)#\)/", $template)){
    if (preg_match_all("/\(#(.*?)#\)/", $template, $variables)){

      foreach ($variables[1] as $i => $variable_name){

        $match		= array_key_exists($variable_name,$data) ? $data[$variable_name] : '';
        $match		= is_array($match) ? json_encode($match) : $match;
        $template	= str_replace($variables[0][$i],$match, $template);
      }
    }
  }

  return $template;
}

function controller(){
  $_POST['email'] = trim($_POST['email']);
  send_email();
  add_response();
  show_all_results();
}

controller();

?>
