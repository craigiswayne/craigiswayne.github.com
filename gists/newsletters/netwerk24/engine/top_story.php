<?php
  $top_story_image_src="http://cdn.24.co.za/files/Cms/General/d/901/2e365c5871dd4b0ab2c8433a952b45f5.jpg";
  $top_story_image_width = intval(getimagesize($top_story_image_src)[0]);
  $p_tag_max_width = (intval($full_newsletter_width) - $top_story_image_width)."px";
?>

<table <?= $table_inline_defaults ?> width="100%" id="top_story" class="content_block">
  <tr>
    <td colspan="2" class="header" style="padding-top: <?= $gap_small ?>;padding-right: <?= $gap_small ?>;padding-bottom: <?= $gap_small ?>;padding-left: <?= $gap_small ?>;background: <?= $color_primary ?>;border-top: 1px solid <?= $color_primary ?>;border-right: 1px solid <?= $color_primary ?>;border-bottom: 1px solid <?= $color_primary ?>;border-left: 1px solid <?= $color_primary ?>;text-align: left;font-weight:bold; font-family:<?= $font_family_brand ?>;-ms-word-wrap: normal;word-wrap: normal;color: #fff;text-decoration: none;font-style:normal;">
      <h4 style="margin-bottom:0;margin-top:0;margin-right:0;margin-left:0;font-size:14px;">
        GOEIEMÔRE, SUID-AFRIKA
      </h4>
    </td>
  </tr>
  <tr>
    <td valign="top" class="content_body" style="border-top:1px solid <?= $color_border ?>;border-right:none;border-bottom:none;border-left:1px solid <?= $color_border ?>;font-family:<?= $font_family_brand ?>;padding-top:<?= $gap ?>;padding-right:<?= $gap ?>;padding-bottom:<?= $gap ?>;padding-left:<?= $gap ?>;">
        <h2 style="color:<?= $color_text?>; margin-top:0; margin-bottom:<?= $gap_small ?>; font-weight:bold;font-style:normal;">As dit in Tlokwe kon gebeur</h2>
        <p style="max-width:<?= $p_tag_max_width ?>;color:<?= $color_text?>">'n Groot deel van pres. Jacob Zuma se nalatenskap sal wees sy verswakking van die ANC-alliansie.</p>
        <p style="max-width:<?= $p_tag_max_width ?>;color:<?= $color_text?>">Die vakverbond Cosatu en die SAKP was twee van Zuma se mees lojale (en luide) ondersteuners op pad na sy oorwinning in 2007 by die ANC-konferensie in Polokwane.</p>
    </td>
    <td style="border-right:1px solid <?= $color_border ?>">
      <img src="<?= $top_story_image_src ?>">
    </td>
  </tr>
  <tr>
    <td colspan="2" class=footer style="background-color:<?= $color_accent ?>;text-align:center; border-right:1px solid <?= $color_border ?>; border-bottom:1px solid <?= $color_border_dark ?>; border-left: 1px solid <?= $color_border ?>; border-top:1px solid <?=$color_primary?>; padding-top:<?= $gap_small ?>;padding-right:<?= $gap_small ?>;padding-bottom:<?= $gap_small ?>;padding-left:<?= $gap_small ?>;">
      <h6 style="margin-top:0;margin-right:0;margin-left:0;text-align:center;color:<?= $color_primary?>; font-weight:normal; margin-bottom:0;font-size:11px;">
        volg <a href="mailto:adriaan.basson@netwerk24.com" id="lnkFollowEmail" target="_top" style="font-weight:bold;color:<?= $color_primary?>">adriaan.basson@netwerk24.com</a> as 'n kontak
      </h6>
    </td>
  </tr>
</table>
