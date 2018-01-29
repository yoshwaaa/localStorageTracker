$headers = array(
        'From' => $from,
        'Reply-To' => $email,
        'To' => $to,
        'Subject' => $subject,
    );

$daralytics = $_POST['daralytics'];
$Message .= "$daralytics";

foreach ($postVars as $key => $value) {
			$amag_arr[] = stripslashes($key)."=".stripslashes($value);
		}

		$query_string = join("&", $amag_arr);

		$amag_curl = curl_init();
		curl_setopt($amag_curl, CURLOPT_URL, 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8');
		curl_setopt($amag_curl, CURLOPT_POST, count($amag_arr));
		curl_setopt($amag_curl, CURLOPT_POSTFIELDS, $query_string);
		curl_setopt($amag_curl, CURLOPT_HEADER, FALSE);
		curl_setopt($amag_curl, CURLOPT_RETURNTRANSFER, FALSE);
		curl_setopt($amag_curl, CURLOPT_FOLLOWLOCATION, TRUE);
		$result = curl_exec($amag_curl);
		curl_close($amag_curl);

	if(!PEAR::isError($Sent)) {
		$MailStatus['mail'] = 'sent';
		$MailStatus['FormType'] = $FormType;
		echo json_encode($MailStatus);
	} else {
		$MailStatus['mail'] = $Sent->getMessage();
		echo json_encode($MailStatus);
	}
}
