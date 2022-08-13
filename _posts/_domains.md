
an A record is a domain pointing direct to an IP.
e.g. www.whatever.com > 123.456.789.9


a CNAME is a domain pointing to another domain.
so some-cname.com > actual.com
when resolving a domain, if its an a record, its done, it just connects to that IP.
if its a cname, it sees "oh it points to actual.com". so it resolves actual.com which is an a record to some IP, and it just uses that IP to connect.
BUT the HTTP protocol and the browser and the server has no knowledge of this.
as far as they are concerned the reqest is to some-cname.com. so the Host header etc will hold that (edited)
but u get things like geo-specific a records, or load balanced a records, etc etc. that shit i got no idea about.
REF: https://www.youtube.com/watch?v=ZXCQwdVgDno

```
urls=("www.spinandwin.com" "www.example.com")

spacer="-----------------------------------------------------------------------------------------";

echo "ONLINE LOOKUP: https://toolbox.googleapps.com/apps/dig/#CNAME/";
echo $spacer;
echo "";

for url in ${urls[@]}; do
  echo "URL:            $url";
  dig $url;
  # CNAME only
  # dig +nocmd $url cname +noall +answer
  echo $spacer;
  echo "";
done

```
