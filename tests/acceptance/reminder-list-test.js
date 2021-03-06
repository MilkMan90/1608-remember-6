/* globals server */

import { test, skip } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

import Ember from 'ember';

moduleForAcceptance('Acceptance | reminders list');


test('viewing the homepage will reroute to /reminders, show 0 reminders, and display the welcome page', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/reminders');
    assert.equal(Ember.$('.spec-reminder-item').length, 0);
    assert.equal(find('.reminder-welcome').length, 1)
  });
});

test('viewing the homepage will reroute to /reminders and show 5 reminders', function(assert) {
  server.createList('reminder', 5);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/reminders');
    assert.equal(Ember.$('.spec-reminder-item').length, 5);
  });
});

test('viewing the homepage will reroute to /reminders and show 15 reminders', function(assert) {
  server.createList('reminder', 15);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/reminders');
    assert.equal(Ember.$('.spec-reminder-item').length, 15);
  });
});

test('clicking on an individual item shows one reminder and its details on the page', function(assert) {
  server.createList('reminder', 5);

  visit('/');
  click('.spec-reminder-item:first');

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1');
    assert.equal(find('h2').text(), find('.spec-reminder-item:first').text().trim());
    assert.equal(find('h5').length, 1);
    assert.equal(find('p').length, 1);
  });
});

test('clicking on an individual item adds an active class to that link', function(assert) {
  visit('reminders/new');
  fillIn('.input-title', 'My new reminder');
  fillIn('.input-date', '10.12.2016');
  fillIn('.input-notes', 'My reminder notes');
  click('.input-submit');

  andThen(function() {
    click('.spec-reminder-item');
  })

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1');
    click('.spec-reminder-item');
  })

  andThen(function() {
    click('.spec-reminder-item');
  })

});
