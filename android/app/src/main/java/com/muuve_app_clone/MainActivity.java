package com.muuve_app_clone;

import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this, true); //hide statusbar when splashscreen displayed
      // SplashScreen.show(this, R.style.SplashScreenTheme); // change statusbar color when splashscreen displyed
      super.onCreate(savedInstanceState);
  }

  protected String getMainComponentName() {
    return "muuve_app_clone";
  }
}
