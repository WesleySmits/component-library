<?php
$props = [
  'image' => get_field('image'),
  'heading' => get_field('heading'),
  'text' => get_field('text'),
  'buttonLabel' => get_field('button_label'),
  'buttonUrl' => get_field('button_url'),
];
?>
<div id="cta-block-<?php echo $block['id']; ?>"
     class="cta-block"
     data-props='<?php echo json_encode($props, JSON_HEX_APOS | JSON_HEX_QUOT); ?>'>
  <!-- Vue will hydrate this block -->
</div>
