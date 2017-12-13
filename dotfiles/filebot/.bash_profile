#
# movies_directory=/Volumes/MEDIA/Movies
# destination_directory=/Volumes/Seagate/Movies;
# find $movies_directory/* -maxdepth 0 -type f  -print0 | while IFS= read -r -d '' file; do
#   echo "Attempting to parse folder... $file";
#   mkdir -p $destination_directory;
#   filebot -r -rename $movies_directory --db TheMovieDB --format "$destination_directory/{n} ({y})/{n}" -get-subtitles --action move --log ALL
#   echo "";
#   echo "==========="
#   echo "";
# done

# REF: https://www.filebot.net/forums/viewtopic.php?f=4&t=4788
function parse_videos (){
  source_directory="$1";
  destination_directory="$2";
  video_db="$3";
  format="$4";

  echo "
FileBot Settings:
Source Directory:       $source_directory
Destination Directory:  $destination_directory
Format:                 $format
Video DB:               $video_db
  ";

  if [[ ! -d $source_directory ]]
  then
    echo "source_directory invalid";
    exit
  fi;

  if [[ ! -d $destination_directory ]]
  then
    echo "destination_directory invalid";
    exit
  fi;

  # filebot -r -rename "$source_directory" --db $video_db --format "$destination_directory/$format" --action move --conflict index -check --log ALL --mode interactive -list
  filebot -r -rename "$source_directory" --db $video_db --format "$destination_directory/$format" --action move --conflict index --log ALL --mode interactive

  filebot -rename *.mkv --q "One-Punch Man" --db "anidb"

  filebot_cleanup "$source_directory";
}

function parse_movies () {
  parse_videos "$(pwd)" "/Volumes/Seagate/Movies" "TheMovieDB" "{n} ({y})/{n}";
}

function parse_anime (){
  parse_videos "$(pwd)" "/Volumes/Seagate/Anime" "anidb" "{n}/Season {s}/{sxe} - {t}";
}

function parse_series (){
  parse_videos "$(pwd)" "/Volumes/Seagate/Series" "TheTVDB" "{n}/Season {s}/{sxe} - {t}";
}


function filebot_cleanup (){
  source_directory="$1";

  # echo "Deleting all .DS_Store files...";
  # find  "$source_directory" -name '.DS_Store' -print0 | while IFS= read -r -d '' file; do
  #   echo "Deleting... $file";
  #   rm "$file";
  # done;

  echo "";

  # echo "Removing empty directories...";
  # find "$source_directory" -type d -exec rmdir {} \;

  filebot -script fn:cleaner "$source_directory"
}

function filebot_amc (){
  source_directory="$(pwd)";
  find "$source_directory" ._* -delete;
  destination_directory="/Volumes/MEDIA"
  filebot -script fn:amc --output "$destination_directory" --conflict index --action move --mode interactive "$source_directory" --log-file ~/Downloads/amc.log --def movieFormat="$destination_directory/Movies/{n} ({y})/{n}" seriesFormat="$destination_directory/Series/{n}/Season {s}/{sxe} - {t}" animeFormat="$destination_directory/Anime/{n}/Season {s}/{sxe} - {t}" musicFormat="$destination_directory/Music/{n} ({y})/{n}" artwork="y" minFileSize=1000 minLengthMS=100
  filebot -script fn:cleaner "$source_directory"
}


function filebot_custom (){
  destination_directory="/Volumes/MEDIA";
  format="$destination_directory/Anime/{n}/Season {s}/{sxe} - {t}";
  video_db=anidb;
  query=$(get_user_input "Enter in your custom query" --default="your-query-here");
  filebot -r -rename "$(pwd)" --db AniDB --format "$destination_directory/$format" --action move --conflict index --log ALL --mode interactive --q "$query";
}
